import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Project {
    _id: ID!
    owner: ID!
    title: String
    description: String
    skills: [String]
    scope: Scope
    budget: Budget
    isPublished: Boolean
    proposers: [ID]
  }

  type Scope {
    size: String
    duration: String
    experience: String
  }

  input ScopeInput {
    size: String
    duration: String
    experience: String
  }

  type Budget {
    type: String
    currency: String
    amount: Int
  }

  input BudgetInput {
    type: String
    currency: String
    amount: Int
  }

  input ProjectsInputFilter {
    title: String
    skills: [String]
    projectType: String
    fixedRate: Int
    hourlyRate: Int
    owner: ID
  }
`;

export default typeDefs;
