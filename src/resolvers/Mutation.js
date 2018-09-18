const bcrypt = require('bcrypt');
const { getUserId, setToken, clearToken } = require('../utils');

async function signup(parent, args, context, info) {
  if (!args.password) throw new Error('missing_password');
  if (!args.email) throw new Error('missing_email');

  const password = await bcrypt.hash(args.password, 10);
  const user = await context.db.mutation.createUser({
    data: { ...args, password },
  }, info);

  setToken(user.id, context);

  return user;
}

async function login(parent, args, context) {
  if (!args.password) throw new Error('wrong_credentials');
  if (!args.email) throw new Error('wrong_credentials');

  const user = await context.db.query.user({ where: { email: args.email } });
  if (!user) throw new Error('wrong_credentials');

  const isValidPass = await bcrypt.compare(args.password, user.password);
  if (!isValidPass) throw new Error('wrong_credentials');

  setToken(user.id, context);

  return user;
}

function logout(parent, args, context) {
  clearToken(context);
  return { message: 'success' };
}

module.exports = {
  signup,
  login,
  logout,
};
