const sha256 = require('sha256')
const jwt = require('jsonwebtoken')

const Post = require('../datas/PostModel')
const User = require('../datas/UserModel')

function posts (obj, args, context, info) {
  if (context.currentUser) {
    return Post.getAll()
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

function post (obj, args, context, info) {
  if (context.currentUser) {
    return Post.getById(args.id)
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

function login (obj, args, context, info) {
  return new Promise((resolve, reject) => {
    const checkPassword = sha256(args.password)
    User.getOneByConditions({
      username: args.username,
      password: checkPassword
    })
      .then(userData => {
        if (
          userData.data &&
          userData.data.error &&
          userData.data.error.length > 0
        ) {
          resolve({
            error: userData.error
          })
        } else {
          const user = userData.data
          const secret = process.env.SECRET
          const newToken = jwt.sign(
            {
              id: user.id,
              username: user.username,
              exp: Math.floor(Date.now() / 1000) + 5 /*60 * 60 * 24 * 30*/
            },
            secret
          )
          resolve({
            ok: true,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            token: newToken
          })
        }
      })
      .catch(err => reject(err))
  })
}

function userExist (parent, args, context) {
  return new Promise((resolve, reject) => {
    User.getOneByConditions({ username: args.username })
      .then(userData => {
        if (userData && userData.error && userData.error.length > 0) {
          const status = userData.error.find(f => f.statusCode === 204)
          if (status !== undefined && status !== null) {
            resolve({
              exist: false
            })
          } else {
            resolve({
              message: 'Something went wrong!',
              statusCode: 500
            })
          }
        } else {
          resolve({
            exist: true
          })
        }
      })
      .catch(err => reject(err))
  })
}

module.exports = {
  posts,
  post,
  login,
  userExist
}
