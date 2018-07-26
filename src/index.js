const { Prisma } = require('prisma-binding');
const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');

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

server.start(() => console.log(`Server is running on http://localhost:4000`));
