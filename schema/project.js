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
    amount: String
  }

  input BudgetInput {
    type: String
    currency: String
    amount: String
  }
`;

export default typeDefs;
