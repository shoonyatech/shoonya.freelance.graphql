import { gql } from "apollo-server-express";

import User from './user.js';
import Freelancer from './freelancer.js'

const Query = `
    type Query {
        user(_id : ID!): User
        countries: [CountryDetails]
        freelancers: [Freelancer]
    }
`;

const schemas = [Query, User, Freelancer]

export default schemas; 