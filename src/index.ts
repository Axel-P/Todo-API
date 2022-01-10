import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { init } from './models/database'
import models from './models'
import typeDefs from './types'
import resolvers from './resolvers'

init()

const PORT = process.env.PORT || 4000
const app = express()
let server: ApolloServer | undefined = undefined
async function startServer() {
    server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({
            models,
        })
    })

    await server.start();

    server.applyMiddleware({ app })
    return server
}

startServer()

app.get('health', (_, res) => res.send('OK'))

app.listen(PORT, () => {
    if (!server) {
        console.log(`Server not ready`)
    } else {
        console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    }

})