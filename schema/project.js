import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Project {
    _id: ID!
    title :String
    description: String
  }
`;

export default typeDefs;