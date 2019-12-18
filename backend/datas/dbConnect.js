const mysql = require('mysql')
const Sequelize = require('sequelize')
const { isNil } = require('lodash')

const pool = mysql.createPool({
  connectionLimit: 10, // default = 10
  host: 'localhost',
  user: 'root',
  password: '123456aA@',
  insecureAuth: true,
  database: 'graphql_demo'
})

let dbConnection = null
let error

function getConnection (callback) {
  if (isNil(dbConnection)) {
    pool.getConnection(function (errCon, connection) {
      dbConnection = connection
      callback(errCon, dbConnection)
    })
  } else {
    return callback(error, dbConnection)
  }
}

/**
 * sequelize
 */
const sequelize = new Sequelize('graphql_demo', 'root', '123456aA@', {
  host: 'localhost',
  dialect: 'mysql'
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = {
  pool,
  getConnection,
  sequelize
}
