import { gql } from 'apollo-server-express'

const typeDefs = gql`
type User @key(fields: "id") {
  id: ID!
  firstname: String
}
extend type Query {
  user(id: ID!): User
  users: [User]
  viewer: User!
}

type Mutation {
  login(email: String!, password: String!): String
}
`

export default typeDefs