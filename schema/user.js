import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID!
    name: String
    title :String
  }

  type Query {
    user(_id : String): User
  }

  type Mutation {
    addUser(name: String, _id :String): User
    updateUserNameTitle(name: String,title: String): User
  }
`;

export default typeDefs;
