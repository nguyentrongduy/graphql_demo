const Sequelize = require('sequelize')
const { sequelize } = require('./dbConnect')

const Model = Sequelize.Model
class PostModel extends Model {}
PostModel.init(
  {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'posts'
  }
)

function getAll () {
  return new Promise((resolve, reject) => {
    PostModel.findAll()
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
    PostModel.findByPk(id)
      .then(result => {
        if (result)
          resolve({
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

module.exports = {
  getAll,
  getById
}
