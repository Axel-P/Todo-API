import { promisify } from 'util'
import sqlite3, { RunResult } from 'sqlite3'

const db = new sqlite3.Database(':memory:')
const all = promisify(db.all).bind(db)

const run = async (query: string, args: any[]): Promise<{id?: number}> => {
  return new Promise((res, rej) => {
    db.run(query, args, function (this: RunResult, err: Error) {
      if (err) rej(err);
      else res({ id: this.lastID })
    })
  })
}

const init = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE users (
      firstname TEXT NOT NULL,
      lastname TEXT,
      userName TEXT NOT NULL,
      password TEXT NOT NULL
    )`)
  })
}

export { all, run, init }

export default db