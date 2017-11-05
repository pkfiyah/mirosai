import 'source-map-support/register'

import fs from 'fs'
import path from 'path'

import config from 'config'
import express from 'express'

import { createServer } from '../lib'

const createApp = ({pkg}) => {

    const serverConfig = config.get('server')

    const app = express()
    const { server, onStart } = createServer({...serverConfig, pkg})

    app.use(server)

    return {
        app,
        onStart
    }
}

if (require.main === module) {
    const port = config.get('port')

    const pkg = JSON.parse(fs.readFileSync(
        path.resolve(__dirname, config.get('package-json'))
    ))

    try {
        const { app, onStart } = createApp({pkg})

        onStart()
            .then(() => {
                console.log('Completed startup hooks.')
                console.log('Stating server.')
                app.listen(port, () => {
                    console.log(`Running server on http://localhost:${port}`)
                })
            })
            .catch(err => {
                console.log(err)
                process.exit(1)
            })
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}
