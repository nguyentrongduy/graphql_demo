const { GraphQLServer } = require('graphql-yoga');
const { get } = require('lodash');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const { tradeTokenForUser } = require('./services/authService');

const resolvers = {
  Query,
  Mutation,
  Subscription
};

const HEADER_NAME = 'authorization';

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  // typeDefs:
  //   `
  //   type Query {
  //     posts: PostsResponse
  //     post(id: String!): PostResponse
  //     login(username: String!, password: String!): Login!
  //     userExist(username: String!): UserExist
  //   }
    
  //   type Subscription {
  //     newPost: Post
  //   }
    
  //   type Mutation {
  //     createPost(title: String!, description: String!): PostResponse!
  //     deletePost(id: String!): PostsResponse!
  //     updatePost(id: String!, title: String!, description: String!): PostsResponse!
  //     register(username: String!, password: String!, firstName: String!, lastName: String!, address: String!): Register
  //   }
    
  //   type PostsResponse {
  //     error: [Error]
  //     data: [Post]
  //   }
    
  //   type PostResponse {
  //     error: [Error]
  //     data: Post
  //   }
    
  //   type Post {
  //     id: String
  //     title: String
  //     description: String
  //   }
    
  //   type Login {
  //     ok: Boolean!
  //     username: String
  //     firstName: String
  //     lastName: String
  //     token: String
  //   }
    
  //   type Register {
  //     id: Int!
  //     username: String!
  //     firstName: String!
  //     lastName: String!
  //     address: String!
  //   }
    
  //   type Error {
  //     message: String!
  //     statusCode: Int!
  //   }
    
  //   type UserExist {
  //     exist: Boolean!
  //   }
  // `
  // ,
  resolvers,
  context: async (contexts) => {
    let authToken = null;
    let currentUser = null;

    try {

      authToken = get(contexts, `request.headers[${HEADER_NAME}]`);
      if (authToken) {
        currentUser = await tradeTokenForUser(authToken);
      }
    } catch (e) {
      console.warn(`Unable to authenticate using auth token: ${authToken}`);
      contexts.response.status = '401'
    }

    return {
      authToken,
      currentUser,
    };
  },
});

server.start(() => console.log(`Server is running on http://localhost:4000`))
