const jwt = require('jsonwebtoken')
const User = require('../datas/UserModel')

async function tradeTokenForUser (token) {
  return new Promise((resolve, reject) => {
    const secret = process.env.SECRET
    jwt.verify(token, secret, (error, payload) => {
      if (error) {
        reject(error)
      } else {
        const { id } = payload
        User.getOneByConditions({ id }).then(result => {
          if (result && result.error && result.error.length > 0) {
            resolve(null)
          } else {
            resolve(result.data)
          }
        })
      }
    })
  })
}

module.exports = {
  tradeTokenForUser
}
