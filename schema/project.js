import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Project {
    _id: ID
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
    fixed: BudgetFilter
    hourly: BudgetFilter
  }

  input BudgetFilter {
    checked: Boolean
    currency: String
    min: Int
    max: Int
  }

  input ProjectInput {
    _id: ID!
    owner: ID!
    title: String
    description: String
    skills: [String]
    scope: ScopeInput
    budget: BudgetInput
  }
`;

export default typeDefs;
