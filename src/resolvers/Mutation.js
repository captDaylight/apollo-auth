const bcrypt = require('bcrypt');
const { getUserId, setToken } = require('../utils');

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

function createTrip(parent, args, context, info) {
  const userId = getUserId(context);

  return context.db.mutation.createTrip({
    data: {
      name: args.name,
      description: args.description,
      organizers: { connect: [{ id: userId }] },
      travelers: { connect: [{ id: userId }] },
    },
  }, info);
}

function onlyNewTravelers(travelers) {
  return userId => travelers.findIndex(traveler => traveler.id === userId) === -1;
}

async function addUsersToTrip(parent, args, context, info) {
  // in the future, it could be user emails. if email doesn't exist then create
  // user and then add to the trip.

  // at some point nested mutations, create users when adding missing ones:
  // https://www.prisma.io/docs/reference/prisma-api/concepts-utee3eiquo/#transactional-mutations
  const userId = getUserId(context);

  const trip = await context.db.query.trip(
    { where: { id: args.tripId } },
    `
      {
        organizers { id }
        travelers { id }
      }
    `,
  );

  if (!trip) throw new Error('no_trip');

  if (trip.organizers.findIndex(organizer => organizer.id === userId) > -1) {
    const ids = args.userIds
      .filter(onlyNewTravelers(trip.travelers))
      .map(id => ({ id }));

    return context.db.mutation.updateTrip({
      where: {
        id: args.tripId,
      },
      data: {
        travelers: { connect: ids },
      },
    }, info);
  }

  throw new Error('no_permission');
}

module.exports = {
  signup,
  login,
  createTrip,
  addUsersToTrip,
};
