import { User, Project } from "./models.js";
import countries from "./data/countries.js";
import freelancers from "./data/freelancer.js";

const resolvers = {
  Query: {
    user(_, args) {
      const { _id,filter } = args
      const shouldApplyFilters = filter !== undefined;
      if (!shouldApplyFilters) {
        return User.findById({ 
          _id 
        })
            }
    },
    countries(){
      return  countries ;
    },
    users(){ 
      return User.find({ })
    },
    freelancers(){ 
      return User.find({ isFreelancer: "true" })
    }
  },
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
      const { title, scope, budget, skills } = args;
      const { userId } = context;
      const userObj = new Project({
        owner: userId,
        title,
        scope,
        budget,
        skills,
        isPublished: false,
      });
      if (userId) {
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

    async updateProjectTitle(_, args, context) {
      const { _id, title } = args;
      const { userId } = context;
      const isProjectOwner = await Project.findOne({
        _id,
        owner: userId,
      }).exec();
      if (isProjectOwner) {
        return Project.findOneAndUpdate(
          { _id },
          {
            $set: {
              title,
            },
          },
          { new: true }
        );
      }
    },

    async updateProjectDescription(_, args, context) {
      const { _id, description } = args;
      const { userId } = context;
      const isProjectOwner = await Project.findOne({
        _id,
        owner: userId,
      }).exec();
      if (isProjectOwner) {
        return Project.findOneAndUpdate(
          { _id },
          {
            $set: {
              description,
            },
          },
          { new: true }
        );
      }
    },

    async updateProjectScope(_, args, context) {
      const { _id, scope } = args;
      const { userId } = context;
      const isProjectOwner = await Project.findOne({
        _id,
        owner: userId,
      }).exec();
      if (isProjectOwner) {
        return Project.findOneAndUpdate(
          { _id },
          {
            $set: {
              scope,
            },
          },
          { new: true }
        );
      }
    },

    async updateProjectBudget(_, args, context) {
      const { _id, budget } = args;
      const { userId } = context;
      const isProjectOwner = await Project.findOne({
        _id,
        owner: userId,
      }).exec();
      if (isProjectOwner) {
        return Project.findOneAndUpdate(
          { _id },
          {
            $set: {
              budget,
            },
          },
          { new: true }
        );
      }
    },

    async updateProjectSkills(_, args, context) {
      const { _id, skills } = args;
      const { userId } = context;
      const isProjectOwner = await Project.findOne({
        _id,
        owner: userId,
      }).exec();
      if (isProjectOwner) {
        return Project.findOneAndUpdate(
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
  },
};

export default resolvers;
