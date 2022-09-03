import { allow, rule, shield } from 'graphql-shield'
import jwt, { JwtHeader, SigningKeyCallback } from 'jsonwebtoken'
import { CertSigningKey, RsaSigningKey } from 'jwks-rsa'
import { client, options } from './config'

function getKey(header: JwtHeader, cb: SigningKeyCallback) {
    client.getSigningKey(header.kid, function (_, key) {
        const signingKey = (key as CertSigningKey).publicKey || (key as RsaSigningKey).rsaPublicKey
        cb(null, signingKey)
    })
}

const isAuthenticated = rule()(async (_,__,context:{token: string}) => {
    if(!context.token)
        return false
    let result = undefined
    try{
        result = await new Promise((resolve, reject) => {
            jwt.verify(context.token, getKey, options, (error, decoded) => {
                if(error) return reject(error)
                return resolve(decoded)
            })
        })
    }catch(exception){
        return false
    }
    
    return result !== undefined
})
  
export default shield({
    Query: {
        _service: allow,
        '*': isAuthenticated
    },
    _Service: {
        sdl: allow
    }
},
{
    debug: true
})