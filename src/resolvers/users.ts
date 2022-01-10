import { Models } from '../models';
import { User } from '../models/types';

const resolvers = {
    Query: {
        users: async (_: unknown, __: unknown, { models }: Models) => {
            return await models.User.getUsers();
        },
    },
    Mutation: {
        createUser: async (_: any, { input: user }: { input: User }, { models }: Models) => {
            const { id } = await models.User.createUser(user);
            return { ...user, id };
        },
    }
}
export default resolvers