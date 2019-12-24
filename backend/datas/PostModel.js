const Sequelize = require('sequelize')
const { sequelizeConnect } = require('./dbConnect')

const Model = Sequelize.Model
class PostModel extends Model {}
PostModel.init(
  {
    id: {
      type: Sequelize.NUMBER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize: sequelizeConnect,
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

function create (values, options = {}) {
  return new Promise((resolve, reject) => {
    PostModel.create(values, options)
      .then(result => {
        resolve({
          data: result
        })
      })
      .catch(err => reject(err))
  })
}

function update (values, options = {}) {
  return new Promise((resolve, reject) => {
    PostModel.update(values, options)
      .then(() => {
        resolve()
      })
      .catch(err => reject(err))
  })
}

function destroy (options = {}) {
  return new Promise((resolve, reject) => {
    PostModel.destroy(options)
      .then(() => {
        resolve()
      })
      .catch(err => reject(err))
  })
}

module.exports = {
  model: PostModel,
  getAll,
  getById,
  create,
  update,
  destroy
}
