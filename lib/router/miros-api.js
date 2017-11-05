import { Router } from 'express'
import bodyParser from 'body-parser'

export default ({
    mirosService
}) => {
    const router = Router({mergeParams: true})
    router.use(bodyParser.json())

    router.post('/', async(req, res, next) => {
        try {
            console.log(`making request`)
            const options = {
                sessionId: req.body.sessionId
            }
            const request = mirosService.textRequest(req.body.query, options)
            console.log(`waiting`)
            request.on('response', function (response) {
                res.status(200).send(response)
            })

            request.on('error', function (error) {
                res.status(504).send(error)
            })

            request.end()

        } catch (err) {
            console.log(err)
            next(err)
        }
    })

    return router
}