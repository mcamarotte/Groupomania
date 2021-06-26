'use strict'
const { Model } = require('sequelize')
const moment = require('moment')
const { deleteFile } = require('../services/file_removal')

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    
    static associate (models) {
      Post.belongsTo(models.User, { foreignKey: 'userId' })
      Post.hasMany(models.Comments)
      Post.hasMany(models.Likes)
    }

    readableCreatedAt () {
      return moment(this.createdAt)
        .locale('en-GB')
        .format('LL')
    }
  }
  Post.init(
    {
      userId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      imageUrl: DataTypes.STRING,
      likesCount: DataTypes.INTEGER
    },
    {
      sequelize,
      validate: {
        eitherContentOrImageUrl () {
          if (!this.content && !this.imageUrl) {
            throw new Error('You cannot create an empty post.')
          }
        }
      },
      modelName: 'Post'
    }
  )

  Post.afterDestroy(async post => {
    if (post.imageUrl) {
      await deleteFile(post.imageUrl)
    }
  })

  Post.afterUpdate(async post => {
    if (post.dataValues.imageUrl !== post._previousDataValues.imageUrl) {
      await deleteFile(post._previousDataValues.imageUrl)
    }
  })

  return Post
}