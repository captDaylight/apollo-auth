function trips(parent, args, context, info) {
  return context.db.query.trips({}, info);
}

module.exports = {
  trips,
};
