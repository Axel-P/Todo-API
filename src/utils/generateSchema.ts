import { exec } from 'child_process'

export default function(port: string = 'default', location: string = 'default'){
    exec(`get-graphql-schema http://localhost:${port}${location} -j > schema.json`)
}