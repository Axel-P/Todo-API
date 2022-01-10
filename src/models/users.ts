import { all, run } from './database'
import { User } from './types'

const TABLE_NAME = 'users'
const createUser = async (user: User) => {
    return await run(
        `INSERT INTO ${TABLE_NAME} (firstname,lastname) VALUES(?,?)`,
        [user.firstname, user.lastname]
    )
}
const getUsers = async () => {
    return await all(
        `SELECT rowid as id,firstname,lastname FROM ${TABLE_NAME}`
    )
}
export default { createUser, getUsers }