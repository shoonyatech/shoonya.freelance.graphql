import { User } from "../models.js";
const userResolver = {
  Query: {
    user(_, args) {
      const { _id } = args;
      return User.findById({
        _id,
      });
    },
  },
  Mutation: {
    async addUser(parent, args, context, info) {
      const { name, _id } = args;
      const { userId } = context;
      const userObj = new User({
        name,
        _id,
      });
      try {
        const result = await userObj.save();
        return { ...result._doc };
      } catch (err) {
        console.error(err);
      }
    },

    updateUserNameTitle(_, args, context) {
      const { _id, name, title } = args;
      const { userId } = context;
      if (userId === _id) {
        return User.findOneAndUpdate(
          { _id },
          {
            $set: {
              name,
              title,
            },
          },
          { new: true }
        );
      }
    },

    updateUserPicture(_, args, context) {
      const { _id, picture } = args;
      const { userId } = context;
      if (userId === _id) {
        return User.findOneAndUpdate(
          { _id },
          {
            $set: {
              picture,
            },
          },
          { new: true }
        );
      }
    },

    updateUserBio(_, args, context) {
      const { _id, bio } = args;
      const { userId } = context;
      if (userId === _id) {
        return User.findOneAndUpdate(
          { _id },
          {
            $set: {
              bio,
            },
          },
          { new: true }
        );
      }
    },

    updateUserContact(_, args, context) {
      const { _id, contact } = args;
      const { userId } = context;
      if (userId === _id) {
        return User.findOneAndUpdate(
          { _id },
          {
            $set: {
              contact,
            },
          },
          { new: true }
        );
      }
    },

    updateUserProfessionalExperience(_, args, context) {
      const { _id, professionalExperience } = args;
      const { userId } = context;
      if (userId === _id) {
        return User.findOneAndUpdate(
          { _id },
          {
            $set: {
              professionalExperience,
            },
          },
          { new: true }
        );
      }
    },

    updateUserSkills(_, args, context) {
      const { _id, skills } = args;
      const { userId } = context;
      if (userId === _id) {
        return User.findOneAndUpdate(
          { _id },
          {
            $set: {
              skills,
            },
          },
          { new: true }
        );
      }
    },

    updateUserEducation(_, args, context) {
      const { _id, education } = args;
      const { userId } = context;
      if (userId === _id) {
        return User.findOneAndUpdate(
          { _id },
          {
            $set: {
              education,
            },
          },
          { new: true }
        );
      }
    },

    updateUserDeveloperCommunityInvolement(_, args, context) {
      const { _id, developerCommunityInvolement } = args;
      const { userId } = context;
      if (userId === _id) {
        return User.findOneAndUpdate(
          { _id },
          {
            $set: {
              developerCommunityInvolement,
            },
          },
          { new: true }
        );
      }
    },

    updateUserLanguages(_, args, context) {
      const { _id, languages } = args;
      const { userId } = context;
      if (userId === _id) {
        return User.findOneAndUpdate(
          { _id },
          {
            $set: {
              languages,
            },
          },
          { new: true }
        );
      }
    },

    updateUserHobbies(_, args, context) {
      const { _id, hobbies } = args;
      const { userId } = context;
      if (userId === _id) {
        return User.findOneAndUpdate(
          { _id },
          {
            $set: {
              hobbies,
            },
          },
          { new: true }
        );
      }
    },

    updateUserSports(_, args, context) {
      const { _id, sports } = args;
      const { userId } = context;
      if (userId === _id) {
        return User.findOneAndUpdate(
          { _id },
          {
            $set: {
              sports,
            },
          },
          { new: true }
        );
      }
    },

    updateUserCountriesICanWork(_, args, context) {
      const { _id, countriesICanWork } = args;
      const { userId } = context;
      if (userId === _id) {
        return User.findOneAndUpdate(
          { _id },
          {
            $set: {
              countriesICanWork,
            },
          },
          { new: true }
        );
      }
    },
  },
};

export default userResolver;
