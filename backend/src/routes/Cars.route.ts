import { Router } from 'express'
import { getRepository, Like } from 'typeorm'

import Car from '../models/Car'
import CreateCarService from '../services/CreateCarService'
import UpdateCarService from '../services/UpdateCarService'
import DeleteCarService from '../services/DeleteCarService'

const carsRoutes = Router()

carsRoutes.post('/', async (request, response) => {
  const { placa, chassi, renavam, modelo, marca, ano } = request.body
  const createCarService = new CreateCarService()
  const car = await createCarService.execute({
    placa,
    chassi,
    renavam,
    marca,
    modelo,
    ano,
  })

  return response.json(car)
})

carsRoutes.put('/:id', async (request, response) => {
  const { id } = request.params
  const { placa, chassi, renavam, modelo, marca, ano } = request.body

  const updateCarService = new UpdateCarService()
  const car = await updateCarService.execute({
    id,
    ano,
    chassi,
    marca,
    renavam,
    modelo,
    placa,
  })

  return response.json(car)
})

carsRoutes.get('/', async (request, response) => {
  const carRepository = getRepository(Car)
  const car = await carRepository.find({ where: { int_excluded: false } })
  return response.json(car)
})

carsRoutes.get('/placa/:placa', async (request, response) => {
  const { placa } = request.params
  const parseFind = `%${placa}%`
  const carRepository = getRepository(Car)
  const car = await carRepository.find({
    where: { placa: Like(parseFind), int_excluded: false },
  })
  return response.json(car)
})

carsRoutes.get('/chassi/:chassi', async (request, response) => {
  const { chassi } = request.params
  const parseFind = `%${chassi}%`
  const carRepository = getRepository(Car)
  const car = await carRepository.find({
    where: { chassi: Like(parseFind), int_excluded: false },
  })
  return response.json(car)
})

carsRoutes.delete('/:id', async (request, response) => {
  const { id } = request.params
  const deleteCarService = new DeleteCarService()
  const car = await deleteCarService.execute({ id })
  return response.status(204).json(car)
})

export default carsRoutes
