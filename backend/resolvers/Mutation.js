const sha256 = require('sha256')
const Post = require('../datas/PostModel')
const User = require('../datas/UserModel')

function createPost (parent, args, context) {
  const title = args.title
  const description = args.description
  if (title === undefined || title === null) {
    return {
      error: [
        {
          message: 'title is require.',
          statusCode: 400
        }
      ]
    }
  }
  if (description === undefined || description === null) {
    return {
      error: [
        {
          message: 'description is require.',
          statusCode: 400
        }
      ]
    }
  }
  return new Promise((resolve, reject) => {
    Post.create({
      title: args.title,
      description: args.description
    })
      .then(() => {
        Post.getAll()
          .then(result => {
            resolve({
              data: result.data
            })
          })
          .catch(err => reject(err))
      })
      .catch(err => reject(err))
  })
}

function updatePost (parent, args, context) {
  if (context.currentUser) {
    return new Promise((resolve, reject) => {
      Post.update(
        {
          title: args.title,
          description: args.description
        },
        {
          where: {
            id: args.id
          }
        }
      )
        .then(() => {
          Post.getAll()
            .then(result => {
              resolve({
                data: result.data
              })
            })
            .catch(err => reject(err))
        })
        .catch(err => reject(err))
    })
  }
  return {
    error: [
      {
        message: 'Unauthorized',
        statusCode: 401
      }
    ]
  }
}

function deletePost (parent, args, context) {
  if (context.currentUser) {
    return new Promise((resolve, reject) => {
      Post.destroy({
        where: {
          id: args.id
        }
      })
        .then(() => {
          Post.getAll()
            .then(result => {
              resolve({
                data: result.data
              })
            })
            .catch(err => reject(err))
        })
        .catch(err => reject(err))
    })
  }
  return {
    error: [
      {
        message: 'Unauthorized',
        statusCode: 401
      }
    ]
  }
}

function register (parent, args, context) {
  return new Promise((resolve, reject) => {
    const values = {
      username: args.username,
      password: sha256(args.password),
      firstName: args.firstName,
      lastName: args.lastName,
      address: args.address
    }
    User.create(values)
      .then(result => {
        console.log(result)
        resolve({
          data: result
        })
      })
      .catch(err => reject(err))
  })
}

module.exports = {
  createPost,
  deletePost,
  updatePost,
  register
}
