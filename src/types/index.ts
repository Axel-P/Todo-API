import { gql } from 'apollo-server-express'

const typeDefs = gql`
type User {
    id: String
    firstname: String
    lastname: String
    userName: String
    password: String
}

input UserInput {
    firstname: String
    lastname: String
    userName: String
    password: String
}

type Query {
    users:[User]
}
type Query {
    getUserAccount(userName: String!, password: String!): User
}
type Mutation{
    createUser(input: UserInput!): User
}
`

export default typeDefs