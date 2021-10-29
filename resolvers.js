import { User, Project } from "./models.js";
import countries from "./data/countries.js";
import freelancers from "./data/freelancer.js";

const resolvers = {
  Query: {
    user(_, args) {
      const { _id } = args;
      return User.findById({
        _id,
      });
    },

    project(_, args) {
      const { _id } = args;
      return Project.findById({
        _id,
      });
    },

    countries() {
      return countries;
    },

    projects() {
      return Project.find({});
    },
  },

  Mutation: {
    async addUser(parent, args, context, info) {
      const { name, _id } = args;
      const { userId } = context;
      if (userId === _id) {
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
      }
    },

    async addProject(_, args, context) {
      const { owner, title, scope, budget, skills } = args;
      const userObj = new Project({
        owner,
        title,
        scope,
        budget,
        skills,
        isPublished: false,
      });
      const { userId } = context;
      if (userId === owner) {
        try {
          const result = await userObj.save();
          return { ...result._doc };
        } catch (err) {
          console.error(err);
        }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
        );
      }
    },

    updateProjectTitle(_, args, context) {
      const { owner, title } = args;
      const { userId } = context;
      if (userId === owner) {
        return Project.findOneAndUpdate(
          { owner },
          {
            $set: {
              title,
            },
          }
        );
      }
    },

    updateProjectDescription(_, args, context) {
      const { owner, description } = args;
      const { userId } = context;
      if (userId === owner) {
        return Project.findOneAndUpdate(
          { owner },
          {
            $set: {
              description,
            },
          }
        );
      }
    },

    updateProjectScope(_, args, context) {
      const { owner, scope } = args;
      const { userId } = context;
      if (userId === owner) {
        return Project.findOneAndUpdate(
          { owner },
          {
            $set: {
              scope,
            },
          }
        );
      }
    },

    updateProjectBudget(_, args, context) {
      const { owner, budget } = args;
      const { userId } = context;
      if (userId === owner) {
        return Project.findOneAndUpdate(
          { owner },
          {
            $set: {
              budget,
            },
          }
        );
      }
    },

    updateProjectSkills(_, args, context) {
      const { owner, skills } = args;
      const { userId } = context;
      if (userId === owner) {
        return Project.findOneAndUpdate(
          { owner },
          {
            $set: {
              skills,
            },
          }
        );
      }
    },
  },
};

export default resolvers;
