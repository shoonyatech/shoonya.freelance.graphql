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
    },
    updateUserPicture(_,args) {
      const { _id, picture } = args  
      return User.updateOne(
        { _id },
        { $set:  {
          picture
        }}
        )
    },
    updateUserBio (_,args) {
      const { _id, bio } = args  
      return User.updateOne(
        { _id },
        { $set:  {
          bio
        }}
      )
    },

  }
}

export default resolvers;
