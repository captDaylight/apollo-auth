function createTrip(parent, args, context, info) {
  return context.db.mutation.createTrip({
    data: {
      name: args.name,
      description: args.description,
    }
  }, info);
}

module.exports = {
  createTrip
}
