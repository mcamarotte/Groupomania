const fs = require('fs')
const db = require('../models')
const { Post }= db.sequelize.models

exports.createPost = async (req,res, next) => {
    let postObject = req.body

    if (req.file) {
        postObject = JSON.parse(req.body.post)
        postObject.imageURL = `${req.protocol}://${req.get('host')}/public/${req.file.filename}`
        }

        try {
            let post = await Post.create({
                ...postObject,
                userId: req.user.id
            })
        post = await Post.findOne({ where: {id: post.id }, include: db.User})
        res.status(201).json({ post })
        } catch (error) {
            console.log(error)
            res.status(400).json({ error })
        }
    }
// retrieve data of one user posted
    exports.getOnePost = (req, res, next) => {
        Post.findOne({
            where: {id: req.params.id},
            include: [{ model: db.User}]
        })
        .then(post => res.status(200).json({ post }))
        .catch(error => res.status(404).json({ error }))
    }
// retrieve data of all posts in descendend order
exports.getAllPosts = (req, res, next) => {
  const limit = 4
  const page = parseInt(req.query.page) || 1

  const options = {
    include: [
      {
        model: db.User
      }
    ],
    limit,
    offset: limit * (page - 1),
    order: [['createdAt', 'DESC']]
  }

  if (req.query.userId) {
    options.where = {
      userId: parseInt(req.query.userId)
    }
  }

  Post.findAll(options)
    .then(posts => res.status(200).json({ posts }))
    .catch(error => res.status(400).json({ error }))
}
// modify post which has already posted
    exports.modifyPost = (req, res, next) => {
        const postObject = req.file
        ?{
            ...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get('host')}/public/${req.file.filename}`
      }
      : { ...req.body }
    
    // retrieve the information of the post already done to be able to modify
        Post.findOne({
            where: { id: req.params.id, userId: req.user.id },
            include: db.User
          }).then(post => {
            if (!post) {
              res.status(400).json({ error: 'You do not have permission to change this post.' })
            } else {
              post.update(postObject).then(post => res.status(200).json({ post }))
            }
          })
        }
    // retrieve the information of the post to be able to delete it
        exports.deletePost = (req, res, next) => {
          const where = {
            id: req.params.id
          }
        
          if (!req.user.admin) {
            where.userId = req.user.id
          }
        
          Post.findOne({ where })
            .then(post => {
              if (!post) {
                res.status(400).json({ error: 'You do not have permission to change this post.' })
              } 
              post
                .destroy()
                .then(() =>
                  res.status(200).json({ message: 'Post deleted.' })
                )
                .catch(error => res.status(400).json({ error }))
            })
            .catch(error => res.status(500).json({ error: error.message }))
        }