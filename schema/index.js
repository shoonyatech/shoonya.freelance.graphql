import User from './user.js';
import Project from './project.js';

const QueryAndMutation = `
    type Query {
        user(_id: ID!): User
        countries: [CountryDetails]
        projects: [Project]
        project(_id: ID! ): Project
    }
    type Mutation {
        addUser(name: String, _id :ID!): User
        updateUserNameTitle( _id: ID!,name: String,title: String): User
        updateUserPicture ( _id: ID!, picture:String ): User
        updateUserBio ( _id: ID!, bio:String ) : User 
        updateUserContact ( _id: ID!, contact : ContactInput ) : User 
        updateUserProfessionalExperience ( _id: ID!, professionalExperience : [ProfessionalExperienceInput] ) : User 
        updateUserSkills ( _id: ID!, skills : [SkillsInput] ) : User 
        updateUserEducation  ( _id: ID!, education : [EducationInput] ) : User 
        updateUserDeveloperCommunityInvolement  ( _id: ID!, developerCommunityInvolement : [DeveloperCommunityInvolementInput] ) : User 
        updateUserLanguages  ( _id: ID!, languages : [String] ) : User 
        updateUserHobbies  ( _id: ID!, hobbies : [String] ) : User 
        updateUserSports  ( _id: ID!, sports : [String] ) : User 
        updateUserCountriesICanWork  ( _id: ID!, countriesICanWork : [String] ) : User 
        
        addProject(owner: ID,title: String, scope: ScopeInput, budget: BudgetInput ): Project
        updateProjectTitle( _id: ID!,title: String): Project
    }
`;

const schemas = [QueryAndMutation,User, Project]

export default schemas;