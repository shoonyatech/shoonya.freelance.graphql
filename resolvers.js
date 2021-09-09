import { User } from "./models.js";

const resolvers = {
  Query: {
    user(_, args) {
      const { _id } = args
      return User.findById({ 
        _id 
      })
    },
  },
  Mutation: {
    async addUser(parent, args, context, info) {
      const { name,_id } = args;
      const userObj = new User({
        name,
        _id
      });
      try {
        const result = await userObj
          .save();
        return { ...result._doc };
      } catch (err) {
        console.error(err);
      }
    },
    updateUserNameTitle : async (_,{ name,title }) => {
      const user = User.updateOne({
        name: {name },
        title: { title }
      })
      try {
        const result = await user
          .save();
        return { ...result._doc };
      } catch (err) {
        console.error(err);
      }
    }
  },
};

export default resolvers;
