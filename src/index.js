const { Prisma } = require('prisma-binding');
const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const AuthPayload = require('./resolvers/AuthPayload');

if (!process.env.NODE_ENV) {
  require('dotenv').config();
}

const resolvers = {
  Mutation,
  Query,
  AuthPayload,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: './src/generated/prisma.graphql',
      endpoint: process.env.DB_ENDPOINT,
      secret: process.env.APP_SECRET,
      debug: true,
    })
  }),
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
