import User from "./user.js";
import Project from "./project.js";
import Proposal from "./proposal.js";

const QueryAndMutation = `
    type Query {
        user(_id: ID!): User
        freelancers(_id: [ID!]!): [User]
        countries: [CountryDetails]
        projects(owner: ID): [Project]
        getUserProjects(_id: ID! ): [Project]
        filterOwnerProjects(owner: ID): [Project]
        project(_id: ID! ): Project
        getProposalsByProject(_id: ID!): [User]
        getProjectOwner(_id: ID!): Project
        getProposals( projectId: ID! ) : [Proposal]
        getUserProposals( _id: ID! ) : [Proposal]
        getProposalsById( _id: ID! ) : Proposal
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
        updateUserDeveloperCommunityInvolement  (developerCommunityInvolement : [DeveloperCommunityInvolementInput] ) : User 
        updateUserLanguages  (languages : [String] ) : User 
        updateUserHobbies  (hobbies : [String] ) : User 
        updateUserSports  (sports : [String] ) : User 
        updateUserCountriesICanWork  (  countriesICanWork : [String] ) : User 
        
        addProject(title: String, scope: ScopeInput, budget: BudgetInput, skills: [String] ): Project
        deleteProject(_id: ID!) : Project
        updateProjectTitle( _id: ID!,title: String): Project
        updateProjectDescription( _id: ID!,description: String): Project
        updateProjectScope( _id: ID!,scope: ScopeInput): Project
        updateProjectBudget( _id: ID!,budget: BudgetInput): Project
        updateProjectSkills( _id: ID!,skills: [String]): Project

        addNewProposal(coverLetter: String!, proposedRate: String!,projectId: ID!,projectTitle: String!,currency: String!) : Proposal
        deleteProposal(_id: ID!) : Proposal
    }
`;

const schemas = [QueryAndMutation, User, Project, Proposal];

export default schemas;
