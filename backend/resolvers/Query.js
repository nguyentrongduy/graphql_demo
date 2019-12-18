const { getConnection } = require('../datas/dbConnect')
const sha256 = require('sha256')
const moment = require('moment')
const { getAll, getById } = require('../datas/PostModel')
const { update } = require('../datas/UserModel')

function posts (obj, args, context, info) {
  if (context.currentUser) {
    return getAll()
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
    return getById(args.id)
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
    getConnection((errCon, connection) => {
      if (errCon) reject(errCon)
      connection.query(
        `SELECT * FROM users WHERE username='${args.username}'`,
        (err, results) => {
          if (err) throw err
          if (results.length > 0) {
            const user = results[0]
            if (user.password === sha256(args.password)) {
              const token = sha256(user.username + moment().toString())
              // connection.query(
              //   `UPDATE users SET token='${token}' WHERE id=${user.id}`,
              //   () => {
              //     resolve({
              //       ok: true,
              //       username: user.username,
              //       firstName: user.firstName,
              //       lastName: user.lastName,
              //       token
              //     })
              //   }
              // )
              const user2 = getById(user.id).data
              update(user2, { token })
              resolve({
                ok: true,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token
              })
            } else {
              resolve({
                ok: false
              })
            }
          } else {
            resolve({
              ok: false
            })
          }
        }
      )
    })
  })
}

function userExist (parent, args, context) {
  return new Promise((resolve, reject) => {
    getConnection((errCon, connection) => {
      if (errCon) reject(errCon)
      connection.query(
        `SELECT * FROM users WHERE username='${args.username}'`,
        (err, results) => {
          if (err) reject(err)
          if (results.length > 0) {
            resolve({
              exist: true
            })
          } else {
            resolve({
              exist: false
            })
          }
        }
      )
    })
  })
}

module.exports = {
  posts,
  post,
  login,
  userExist
}
