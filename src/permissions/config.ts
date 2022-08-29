import { Algorithm } from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'

export const client = jwksClient({
    jwksUri: `https://${process.env.AUTH0_ISSUER}/.well-known/jwks.json`
})

export const options = {
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_ISSUER}/`,
    algorithms: ['RS256'] as Algorithm[]
}
