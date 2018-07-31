const jwt = require('jsonwebtoken');

function getUserId(context) {
  const Authorization = context.request.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');

    const { userId } = jwt.verify(token, process.env.AUTH_SECRET);

    return userId;
  }
  throw new Error('not_authenticated');
}

module.exports = {
  getUserId,
}
