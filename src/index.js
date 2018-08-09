const { Prisma } = require('prisma-binding');
const { GraphQLServer } = require('graphql-yoga');
const donenv = require('dotenv');
const cookieParser = require('cookie-parser');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const AuthPayload = require('./resolvers/AuthPayload');

if (!process.env.NODE_ENV) {
  donenv.config();
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
    }),
  }),
});

server.express.use(cookieParser());

const serverOptions = {
  port: process.env.PORT || 4000,
  cors: {
    credentials: true,
    // origin: process.env.FRONTEND_URL,
  },
};

server.start(
  serverOptions,
  ({ port }) => console.log(`Server is running on ${port}`),
);
