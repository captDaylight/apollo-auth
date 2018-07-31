const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserId } = require('../utils');

async function signup(parent, args, context, info) {
  if (!args.password) throw new Error('missing_password');
  if (!args.email) throw new Error('missing_email');

  const password = await bcrypt.hash(args.password, 10);
  const user = await context.db.mutation.createUser({
    data: { ...args, password }
  }, '{ id }');

  const token = jwt.sign({ userId: user.id }, process.env.AUTH_SECRET);

  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  if (!args.password) throw new Error('wrong_credentials');
  if (!args.email) throw new Error('wrong_credentials');

  const user = await context.db.query.user({ where: { email: args.email } }, '{ id password }');
  if (!user) throw new Error('wrong_credentials');

  const isValidPass = await bcrypt.compare(user.password, args.password);
  if (!isValidPass) throw new Error('wrong_credentials');

  const token = jwt.sign({ userId: user.id }, process.env.AUTH_SECRET);

  return {
    token,
    user,
  };
}

function createTrip(parent, args, context, info) {
  const usedId = getUserId(context);

  return context.db.mutation.createTrip({
    data: {
      name: args.name,
      description: args.description,
      owner: { connect: { id: userId } },
      travelers: { connect: [{ id: userId }] },
    }
  }, info);
}

module.exports = {
  signup,
  login,
  createTrip
}
