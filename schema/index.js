import { gql } from "apollo-server-express";

import User from './user.js';
import Project from './project.js';
import Freelancer from './freelancer.js'

const Query = `
    type Query {
        user(_id : ID!): User
        countries: [CountryDetails]
        project: Project
        freelancer: [Freelancer]
    }
`;

const schemas = [Query, User, Freelancer, Project]

export default schemas; 