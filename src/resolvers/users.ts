import data from '../data'
import { AuthenticationError } from 'apollo-server'

const resolvers = {
    Account: {
        _resolveReference(object: {id: string}) {
            return data.users.find(user => user.id === object.id) 
        }   
    },   
    Query: {
        user(_:unknown, { id }:{ id:string }) {
            return data.users.find(user => user.id === id)
        },
        users() {
            try{
                return data.users
            }catch(e){
                throw new AuthenticationError('You must be logged in to do this')
            }
        }
    },
    Mutation: {
        login: async () => {
            return "To be deleted"
        }
    }
}
export default resolvers