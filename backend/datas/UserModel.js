const Sequelize = require('sequelize')
const { sequelize } = require('./dbConnect')

const Model = Sequelize.Model
class UserModel extends Model {}
UserModel.init(
  {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING
    },

    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize,
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
        if (result)
          resulve({
            data: result
          })
        else
          resolve({
            error: [
              {
                message: 'No Content.',
                statusCode: 204
              }
            ]
          })
      })
      .catch(err => reject(err))
  })
}

function update (user, values) {
  user.update(values).success(res => {
    console.log(res)
  })
}

module.exports = {
  getAll,
  getById,
  update
}
