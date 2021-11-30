import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Proposal {
    _id: ID!
    coverLetter: String
    propossedRate: String
    proposser: ID!
    projectId: ID!
  }
`;

export default typeDefs;
