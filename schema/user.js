import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID!
    name: String
    title :String
    picture: String 
    bio: String
    contact: Contact
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

  type Query {
    user(_id : String): User
  }

  type Mutation {
    addUser(name: String, _id :String): User
    updateUserNameTitle( _id: ID!,name: String,title: String): User
    updateUserPicture ( _id: ID!, picture:String ): User
    updateUserBio ( _id: ID!, bio:String ) : User 
    updateUserContact ( _id: ID!, contact : ContactInput ) : User 
  }
`;

export default typeDefs;
