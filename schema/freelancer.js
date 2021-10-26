import { gql } from 'apollo-server-express'

const typeDefs = gql`
    type Freelancer {
        name: String
        skills: [String]
        expInYears: Int
        hourlyRate: Money
        image: String
    }
    type Money {
        amount: Int
        currency: String
    }
`;

export default typeDefs;