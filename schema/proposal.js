import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Proposal {
    _id: ID!
    coverLetter: String
    proposedRate: String
    projectTitle: String
    currency: String
    projectId: ID!
    proposser: Proposser
  }

  type Proposser {
    _id: ID!
    name: String
    avatar: String
    skills: [String]
    location: String
  }
`;

export default typeDefs;
