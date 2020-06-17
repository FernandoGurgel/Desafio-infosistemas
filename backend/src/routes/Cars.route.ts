import { Router } from 'express'

const carsRoutes = Router()

carsRoutes.get('/', async (request, response) => {
  return response.send(200)
})

export default carsRoutes
