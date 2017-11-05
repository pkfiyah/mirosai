import express from 'express'

export default ({pkg}) => {
    const app = express()

    app.get('/', (req, res, next) => { res.json(pkg) })


    const onStart = async () => {

    }

    return {
        server: app,
        onStart
    }
}
