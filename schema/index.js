import { gql } from "apollo-server-express";

import User from './user.js';

const Query = `
    type Query {
        user(_id : ID!): User
        users: [User]
        freelancers: [User]
        countries: [CountryDetails]
    }
`;

const schemas = [Query, User]

export default schemas; 