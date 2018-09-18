const { getUserId } = require('../utils');

async function user(parent, args, context, info) {
  const userId = await getUserId(context);

  return context.db.query.user({
    where: { id: userId },
  }, info);
}

module.exports = {
  user,
};
