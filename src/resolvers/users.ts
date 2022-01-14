import { Models } from '../models'
import { User } from '../models/types'

const resolvers = {
    Query: {
        users: async (_: unknown, __: unknown, { models }: Models) => {
            return await models.User.getUsers()
        },
        getUserAccount: async (_: unknown, input: Pick<User, 'userName' | 'password'>, { models }: Models) => {
            const modelReturn = await models.User.getUserAccount(input.userName, input.password)
            return modelReturn
        },
    },
    Mutation: {
        createUser: async (_: unknown, { input: user }: { input: User }, { models }: Models) => {
            const { id } = await models.User.createUser(user)
            return { ...user, id }
        },
    }
}
export default resolvers