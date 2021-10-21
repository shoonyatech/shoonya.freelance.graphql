import { User,Project } from "./models.js";
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

    project(_, args) {
      const { _id,filter } = args
        return Project.findById({ 
          _id 
        })
    },

    countries(){
      return  countries ;
    },


    projects() {
      return Project.find({})
    }
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
    
    async addProject(_, args) {
      const { owner, title, scope, budget} = args;
      const userObj = new Project({
        owner,
        title,
        scope,
        budget,
        isPublished: false
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
    updateUserContact (_,args) {
      const { _id, contact } = args 
      return User.updateOne(
        { _id },
        { $set:  {
          contact
        }}
      )
    },


    updateUserProfessionalExperience (_,args) {
      const { _id, professionalExperience } = args 
      return User.updateOne(
        { _id },
        { $set:  {
          professionalExperience 
        }}
      )
    },

    updateUserSkills (_,args) {
      const { _id, skills } = args 
      return User.updateOne(
        { _id },
        { $set:  {
          skills
        }}
      )
    },


    updateUserEducation (_,args) {
      const { _id, education } = args 
      return User.updateOne(
        { _id },
        { $set:  {
          education
        }}
      )
    },

    updateUserDeveloperCommunityInvolement (_,args) {
      const { _id, developerCommunityInvolement } = args 
      return User.updateOne(
        { _id },
        { $set:  {
          developerCommunityInvolement
        }}
      )
    },

    updateUserLanguages (_,args) {
      const { _id, languages } = args 
      return User.updateOne(
        { _id },
        { $set:  {
          languages
        }}
      )
    },
    updateUserHobbies (_,args) {
      const { _id, hobbies } = args 
      return User.updateOne(
        { _id },
        { $set:  {
          hobbies
        }}
      )
    },

    updateUserSports (_,args) {
      const { _id, sports } = args 
      return User.updateOne(
        { _id },
        { $set:  {
          sports
        }}
      )
    },

    updateUserCountriesICanWork (_,args) {
      const { _id, countriesICanWork } = args 
      return User.updateOne(
        { _id },
        { $set:  {
          countriesICanWork
        }}
      )
    },

     updateProjectTitle(_, args ) {
      const { _id, title } = args  
      return Project.findOneAndUpdate(
        { _id },
        { $set:  {
          title
        }}
        )
    },

  }
}

export default resolvers;
