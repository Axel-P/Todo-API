import { run } from "../database"
import { User } from "../types"
import { TABLE_NAME } from "./consts"

const createUser = async (user: User) => {
    return await run(
        `INSERT INTO ${TABLE_NAME} (firstname,lastname,userName,password) VALUES(?,?,?,?)`,
        [user.firstName, user.lastName, user.userName, user.password]
    )
}

export default createUser