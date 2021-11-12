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
      const { name, title } = args;
      const { userId } = context;
      if (userId)
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $set: {
              name,
              title,
            },
          },
          { new: true }
        );
    },

    updateUserPicture(_, args, context) {
      const { picture } = args;
      const { userId } = context;
      if (userId)
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $set: {
              picture,
            },
          },
          { new: true }
        );
    },

    updateUserBio(_, args, context) {
      const { bio } = args;
      const { userId } = context;
      if (userId)
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $set: {
              bio,
            },
          },
          { new: true }
        );
    },
    updateUserContact(_, args, context) {
      const { contact } = args;
      const { userId } = context;
      if (userId)
        return User.findOneAndUpdate(
          { _id: userId },

          {
            $set: {
              contact,
            },
          },
          { new: true }
        );
    },
    updateUserProfessionalExperience(_, args, context) {
      const { professionalExperience } = args;
      const { userId } = context;
      if (userId)
        return User.findOneAndUpdate(
          { _id: userId },

          {
            $set: {
              professionalExperience,
            },
          },
          { new: true }
        );
    },

    updateUserSkills(_, args, context) {
      const { skills } = args;
      const { userId } = context;
      if (userId)
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $set: {
              skills,
            },
          },
          { new: true }
        );
    },

    updateUserEducation(_, args, context) {
      const { education } = args;
      const { userId } = context;
      if (userId)
        return User.findOneAndUpdate(
          { _id: userId },

          {
            $set: {
              education,
            },
          },
          { new: true }
        );
    },

    updateUserDeveloperCommunityInvolement(_, args, context) {
      const { developerCommunityInvolement } = args;
      const { userId } = context;
      if (userId)
        return User.findOneAndUpdate(
          { _id: userId },

          {
            $set: {
              developerCommunityInvolement,
            },
          },
          { new: true }
        );
    },

    updateUserLanguages(_, args, context) {
      const { languages } = args;
      const { userId } = context;
      if (userId)
        return User.findOneAndUpdate(
          { _id: userId },

          {
            $set: {
              languages,
            },
          },
          { new: true }
        );
    },

    updateUserHobbies(_, args, context) {
      const { hobbies } = args;
      const { userId } = context;
      if (userId)
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $set: {
              hobbies,
            },
          },
          { new: true }
        );
    },

    updateUserSports(_, args, context) {
      const { sports } = args;
      const { userId } = context;
      if (userId)
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $set: {
              sports,
            },
          },
          { new: true }
        );
    },

    updateUserCountriesICanWork(_, args, context) {
      const { countriesICanWork } = args;
      const { userId } = context;
      if (userId)
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $set: {
              countriesICanWork,
            },
          },
          { new: true }
        );
    },
  },
};

export default userResolver;
