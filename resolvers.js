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
    updateUserNameTitle(_, args ) {
      const { _id, name , title } = args  
      return User.updateOne(
        { _id },
        { $set:  {
          name,
          title
        }}
        )
    }
  },
};

export default resolvers;
