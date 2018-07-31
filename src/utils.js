const jwt = require('jsonwebtoken');
const APP_SECRET = 'auth_secret';

function getUserId(context) {
  const Authorization = context.request.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');

    const { userId } = jwt.verify(token, APP_SECRET);

    return userId;
  }
  throw new Error('not_authenticated');
}

module.exports = {
  APP_SECRET,
  getUserId,
}
