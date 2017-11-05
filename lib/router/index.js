import { Router } from 'express'
import createMirosRouter from './miros-api'

export default ({
    mirosService
}) => {
    const router = Router({mergeParams: true})
    router.use('/miros', createMirosRouter({mirosService}))
    return router
}