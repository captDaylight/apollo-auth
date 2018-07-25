const { Prisma } = require('prisma-binding');
const { GraphQLServer } = require('graphql-yoga');

const resolvers = {};

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
  })
});
