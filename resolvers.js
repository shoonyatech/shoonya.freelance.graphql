import { User } from "./models.js";

const resolvers = {
  Query: {
    users(parent, args, context, info) {
      return User.find()
        .then((restaurant) => {
          return restaurant.map((r) => ({ ...r._doc }));
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  Mutation: {
    addUser(parent, args, context, info) {
      const { name, profilePicUrl } = args;
      const userObj = new User({
        name,
        profilePicUrl,
      });
      return userObj
        .save()
        .then((result) => {
          return { ...result._doc };
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};

export default resolvers;
