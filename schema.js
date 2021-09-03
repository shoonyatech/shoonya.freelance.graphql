import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: String
    name: String
    profilePicUrl: String
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(name: String, profilePicUrl: String): User
  }
`;

export default typeDefs;
