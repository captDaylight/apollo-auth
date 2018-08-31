const { getUserId } = require('../utils');

async function user(parent, args, context, info) {
  const userId = await getUserId(context);

  return context.db.query.user({
    where: { id: userId },
  }, info);
}

function trips(parent, args, context, info) {
  return context.db.query.trips({}, info);
}

module.exports = {
  user,
  trips,
};
