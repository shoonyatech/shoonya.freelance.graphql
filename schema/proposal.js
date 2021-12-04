import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Proposal {
    _id: ID!
    coverLetter: String
    proposedRate: String
    projectTitle: String
    projectId: ID!
  }
`;

export default typeDefs;
