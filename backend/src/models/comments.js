'use strict';
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {

    static associate (models) {
      Comments.belongsTo(models.User, { foreignKey: 'userId' })
      Comments.belongsTo(models.Post, { foreignKey: 'postId' })
    }
  }
  Comments.init(
    {
    postId: DataTypes.INTEGER,
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: DataTypes.INTEGER
  },
  {
    sequelize,
    modelName: 'Comments'
  }
)

Comments.afterCreate(async comment => {
  const post = await comment.getPost()
  const user = await comment.getUser()

  if (user.id == post.userId) return

  const notification = await sequelize.models.Notification.create({
    content: `<b>${user.firstName} ${ 
      user.lastName
    }</b> commented on your post from ${post.readableCreatedAt()}`,
    recipientUserId: post.userId,
    postId: post.id,
    senderUserId: user.id,
  })
  console.log (notification)

})

return Comments
}