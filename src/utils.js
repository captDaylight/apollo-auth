const jwt = require('jsonwebtoken');

async function getUserId(context) {
  const { token } = context.request.cookies;

  if (!token) throw new Error('not_authenticated');

  const { userId } = jwt.verify(token, process.env.AUTH_SECRET);
  const userExists = await context.prisma.exists.User({ id: userId });

  if (!userExists) throw new Error('not_authenticated');

  return userId;
}

function setToken(userId, context) {
  const token = jwt.sign({ userId }, process.env.AUTH_SECRET);

  context.response.cookie('token', token, {
    /* 1000 years (basically never expires), TODO: work out expiry */
    maxAge: 1000 * 60 * 60 * 24 * 365,
    httpOnly: true,
  });
}

module.exports = {
  getUserId,
  setToken,
};
