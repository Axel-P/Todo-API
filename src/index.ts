import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway'
import generateSchema from './utils/generateSchema'
import { init } from './models/database'

init()

const PORT = process.env.PORTS_DEFAULT || '4000'
const app = express()



interface IGatewayContext{
    token:string
}

const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
            { name: 'users', url: `http://localhost:${process.env.PORTS_USERS}/graphql` }
        ]
    }),
    buildService({ url }){
        return new RemoteGraphQLDataSource<IGatewayContext>({
            url,
            willSendRequest({ request, context }){
                request.http?.headers.set('token', 'token' in context ? (context as IGatewayContext).token : '')
            }
        })
    }
})

let server: ApolloServer | undefined = undefined

async function startServer() {

    server = new ApolloServer({
        introspection: false,
        gateway,
        context: ({ req }) => {
            const token = req.headers.authorization || ''

            return { token }
        }
    })

    await server.start()

    server.applyMiddleware({ app })
    return server
}

startServer()

app.listen(PORT, () => {
    if (!server) {
        console.log(`Server not ready`)
    } else {
        generateSchema(PORT, server.graphqlPath)
        console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)

    }
})