import { gql } from "apollo-server-express";

const typeDefs = gql`
type User {
    id: String
    firstname: String
    lastname: String
}

input UserInput {
    firstname: String
    lastname: String
}
type Query {
    users:[User]
}
type Mutation{
    createUser(input: UserInput!): User
}
`

export default typeDefs