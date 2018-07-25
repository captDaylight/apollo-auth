const { Prisma } = require('prisma-binding');
const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./src/Mutation');
const Query = require('./src/Query');

const resolvers = {
  Mutation,
  Query,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: './src/generated/prisma.graphql',
      endpoint: '',
      secret: 'supersecret',
      debug: true,
    })
  }),
});
