import { exec } from 'child_process'

export default function(port = 'default', location = 'default'){
    exec(`get-graphql-schema http://localhost:${port}${location} -j > schema.json`)
}