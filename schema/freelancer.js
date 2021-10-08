import { gql } from 'apollo-server-express'

const typeDefs = gql`
    type Freelancer {
        name: String
        skills: [String]
        experience: Int
        rate: Int
        currency: String
        image: String
    }
`;

export default typeDefs;