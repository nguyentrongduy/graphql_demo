const { ApolloServer } = require('apollo-server')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const { tradeTokenForUser } = require('./services/authService')
const { typeDefs } = require('./schema')

const resolvers = {
  Query,
  Mutation
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async contexts => {
    let authToken = null
    let currentUser = null

    try {
      authToken =
        contexts &&
        contexts.req &&
        contexts.req.headers &&
        contexts.req.headers.authorization
          ? contexts.req.headers.authorization
          : ''
      if (authToken) {
        currentUser = await tradeTokenForUser(authToken)
      }
    } catch (e) {
      console.warn(`Unable to authenticate using auth token: ${authToken}`)
      contexts.response.status = '401'
    }

    return {
      authToken,
      currentUser
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
