const Sequelize = require('sequelize')
const { sequelizeConnect } = require('./dbConnect')

const Model = Sequelize.Model
class UserModel extends Model {}
UserModel.init(
  {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize: sequelizeConnect,
    timestamps: true,
    modelName: 'users'
  }
)

function getAll () {
  return new Promise((resolve, reject) => {
    UserModel.findAll()
      .then(result => {
        resolve({
          data: result
        })
      })
      .catch(err => reject(err))
  })
}

function getById (id) {
  return new Promise((resolve, reject) => {
    UserModel.findByPk(id)
      .then(result => {
        if (result) {
          resolve({
            data: result
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
      })
      .catch(err => reject(err))
  })
}

function getOneByUsername (username) {
  return new Promise((resolve, reject) => {
    UserModel.findOne({
      where: {
        username
      }
    })
      .then(result => {
        if (result) {
          resolve({
            data: result
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
      })
      .catch(err => reject(err))
  })
}

function getOneByConditions (conditions) {
  return new Promise((resolve, reject) => {
    UserModel.findOne({
      where: conditions
    })
      .then(result => {
        if (result) {
          resolve({
            data: result
          })
        } else {
          resolve({
            error: [
              {
                message: 'No Content',
                statusCode: 204
              }
            ]
          })
        }
      })
      .catch(err => reject(err))
  })
}

function update (values, id, options = {}) {
  return new Promise((resolve, reject) => {
    UserModel.update(values, {
      where: {
        id
      },
      ...options
    })
      .then(result => {
        resolve()
      })
      .catch(err => reject(err))
  })
}

function create (values, options = {}) {
  return new Promise((resolve, reject) => {
    UserModel.create(values, options)
      .then(result => {
        resolve(result)
      })
      .catch(err => reject(err))
  })
}

module.exports = {
  model: UserModel,
  getAll,
  getById,
  update,
  getOneByUsername,
  getOneByConditions,
  create
}
