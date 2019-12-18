const { getConnection } = require('../datas/dbConnect')
const sha256 = require('sha256')

function createPost (parent, args, context) {
  return new Promise((resolve, reject) => {
    getConnection(function (errCon, connection) {
      if (errCon) reject(errCon)
      connection.query(
        `INSERT INTO posts (title, description) VALUES ('${args.title}', '${args.description}')`,
        (err, results) => {
          if (err) reject(err)
          resolve({
            data: {
              title: args.title,
              description: args.description
            }
          })
        }
      )
    })
  })
}

function updatePost (parent, args, context) {
  if (context.currentUser) {
    return new Promise((resolve, reject) => {
      getConnection((errCon, connection) => {
        if (errCon) reject(errCon)
        connection.query(
          `UPDATE posts
                SET title = '${args.title}',
                description = '${args.description}'
                WHERE id=${args.id};`,
          (err, result) => {
            if (err) reject(err)
            connection.query(
              'SELECT * FROM posts',
              (selectErr, selectResults) => {
                if (selectErr) reject(selectErr)
                if (selectResults.length > 0) {
                  resolve({
                    data: selectResults
                  })
                } else {
                  resolve({
                    error: [
                      {
                        message: 'No Content.',
                        statusCode: 204
                      }
                    ]
                  })
                }
              }
            )
          }
        )
      })
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
      getConnection((errCon, connection) => {
        if (errCon) reject(errCon)
        connection.query(
          `DELETE FROM posts WHERE id=${args.id}`,
          (err, result) => {
            if (err) reject(err)
            connection.query(
              'SELECT * FROM posts',
              (selectErr, selectResults) => {
                if (selectErr) reject(selectErr)
                if (selectResults.length > 0) {
                  resolve({
                    data: selectResults
                  })
                } else {
                  resolve({
                    error: [
                      {
                        message: 'No Content.',
                        statusCode: 204
                      }
                    ]
                  })
                }
              }
            )
          }
        )
      })
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
    getConnection((errCon, connection) => {
      if (errCon) reject(errCon)
      connection.query(
        `INSERT INTO users
            (username, password, firstName, lastName, address) 
            VALUES
             ('${args.username}', '${sha256(args.password)}', '${
          args.firstName
        }', '${args.lastName}', '${args.address}')`,
        (err, result) => {
          if (err) reject(err)
          connection.query(
            `SELECT * FROM users WHERE username='${args.username}'`,
            (selectErr, selectResults) => {
              if (selectErr) reject(selectErr)
              if (selectResults.length > 0) {
                const currentUser = selectResults[0]
                delete currentUser.password
                resolve({
                  data: currentUser
                })
              } else {
                resolve({
                  error: [
                    {
                      message: 'No Content.',
                      statusCode: 204
                    }
                  ]
                })
              }
            }
          )
        }
      )
    })
  })
}

module.exports = {
  createPost,
  deletePost,
  updatePost,
  register
}
