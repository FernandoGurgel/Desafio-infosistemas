import { Router } from 'express'

import CarsRoute from './Cars.route'

const routes = Router()

routes.use('/cars', CarsRoute)

export default routes
