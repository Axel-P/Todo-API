import { all } from "../database"
import { User } from "../types"
import { TABLE_NAME } from "./consts"

type ReturnType = Pick<User, 'id' | 'firstName' | 'lastName'> | undefined
const getUserAccount = async (userName: string, password: string):Promise<ReturnType> => {
    const dbOutput = await all(`SELECT rowid as id,firstname,lastname FROM ${TABLE_NAME} WHERE userName = "${userName}" AND password = "${password}"`) as ReturnType[]
    if(dbOutput && dbOutput.length === 1){
        return dbOutput[0]
    }
    return undefined
}

export default getUserAccount