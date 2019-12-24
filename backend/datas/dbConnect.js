const Sequelize = require('sequelize')

/**
 * sequelize
 */
const sequelizeConnect = new Sequelize('graphql_demo', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql'
})

sequelizeConnect
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = {
  sequelizeConnect
}
