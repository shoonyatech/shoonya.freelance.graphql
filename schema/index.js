import User from "./user.js";
import Project from "./project.js";

const QueryAndMutation = `
    type Query {
        user(_id: ID!): User
        countries: [CountryDetails]
        projects: [Project]
        project(_id: ID! ): Project
    }
    type Mutation {
        addUser(name: String, _id :ID!): User
        updateUserNameTitle( name: String,title: String): User
        updateUserPicture (picture:String ): User
        updateUserBio (bio:String ) : User 
        updateUserContact (contact : ContactInput ) : User 
        updateUserProfessionalExperience (professionalExperience : [ProfessionalExperienceInput] ) : User 
        updateUserSkills (skills : [SkillsInput] ) : User 
        updateUserEducation(education : [EducationInput] ) : User 
        updateUserDeveloperCommunityInvolement  (  developerCommunityInvolement : [DeveloperCommunityInvolementInput] ) : User 
        updateUserLanguages  (  languages : [String] ) : User 
        updateUserHobbies  (  hobbies : [String] ) : User 
        updateUserSports  ( sports : [String] ) : User 
        updateUserCountriesICanWork  (  countriesICanWork : [String] ) : User 
        
        addProject(title: String, scope: ScopeInput, budget: BudgetInput, skills: [String] ): Project
        updateProjectTitle( _id: ID!,title: String): Project
        updateProjectDescription( _id: ID!,description: String): Project
        updateProjectScope( _id: ID!,scope: ScopeInput): Project
        updateProjectBudget( _id: ID!,budget: BudgetInput): Project
        updateProjectSkills( _id: ID!,skills: [String]): Project

    }
`;

const schemas = [QueryAndMutation, User, Project];

export default schemas;
