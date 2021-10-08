import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID!
    name: String
    title :String
    picture: String 
    bio: String
    contact: Contact
    professionalExperience: [ProfessionalExperience]
    skills : [Skills]
    education: [Education]
    developerCommunityInvolement: [DeveloperCommunityInvolement]
    languages: [String]
    hobbies: [String]
    sports: [String]
    countriesICanWork: [String]
  }

  type CountryDetails {
    name: String
    currency: String
  }
  
  type DeveloperCommunityInvolement {
    title: String 
    description : String
  }

  input DeveloperCommunityInvolementInput {
    title: String 
    description : String
  }

  type Education {
    degree: String
    school: String
    startYear: Int
    endYear: Int
  }

  input EducationInput {
    degree: String
    school: String
    startYear: Int
    endYear: Int
  }

  type Skills {
    name : String 
    scale : Int
  }

  input SkillsInput {
    name : String 
    scale : Int
  }

  type ProfessionalExperience {
    company : String
    jobTitle :  String
    location : String
    startYear : Int
    endYear : Int
    description : String
    currentJob : Boolean 
    techStack : [String]
  }
  
  input ProfessionalExperienceInput {
    company : String
    jobTitle :  String  
    startYear :  Int
    endYear : Int
    location : String
    description : String
    currentJob : Boolean
    techStack : [String]
  }

  type Contact {
    location : String 
    phone : String
    mail : String
    linkedin : String
    github : String
    twitter : String
  }

  input ContactInput {
    location : String 
    phone : String
    mail : String
    linkedin : String
    github : String
    twitter : String
  }
`;

export default typeDefs;
