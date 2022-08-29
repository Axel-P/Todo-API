import typeDefs from '../../types'
import resolvers from '../../resolvers'
import { buildSubgraphSchema } from '@apollo/subgraph/dist/buildSubgraphSchema'
import { applyMiddleware } from 'graphql-middleware'
import permissions from '../../permissions'
import { ApolloServer } from 'apollo-server'

const server = new ApolloServer({
    introspection: false,
    schema: applyMiddleware(buildSubgraphSchema([{ typeDefs, resolvers }]), permissions),
    context: ({ req }) => ({ token: req.headers.token })
})

server.listen({ port: process.env.PORTS_USERS }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})