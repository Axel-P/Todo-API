import { all } from "../database"
import { TABLE_NAME } from "./consts"

const getUsers = async () => {
    return await all(
        `SELECT rowid as id,firstname,lastname FROM ${TABLE_NAME}`
    )
}

export default getUsers