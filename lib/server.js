import express from 'express'
import apiai from 'apiai'
import createRouter from './router'
import path from 'path'

export default ({pkg, miros}) => {
    const app = express()

    var mirosService = apiai(miros.token)
    const router = createRouter({
        mirosService
    })

    app.get('/', (req, res, next) => {
        res.sendFile(path.join(__dirname + '/frontend/index.html'))
    })
    app.use('/v1', router)
    const onStart = async () => {

    }

    return {
        server: app,
        onStart
    }
}
