import { getRepository, Not, Equal } from 'typeorm'

import Car from '../models/Car'
import AppError from '../errors/AppError'

interface carDTO {
  id: string
  placa: string
  chassi: string
  renavam: number
  modelo: string
  marca: string
  ano: number
}

class CreateCarService {
  public async execute({
    id,
    ano,
    chassi,
    marca,
    modelo,
    placa,
    renavam,
  }: carDTO): Promise<Car> {
    const carRespository = getRepository(Car)
    const findById = carRespository.findOne({ where: { id } })

    if (!findById) {
      throw new AppError('Este id é invalido')
    }

    const findCarPlacaExists = await carRespository.findOne({
      where: { placa, id: Not(Equal(id)) },
    })

    if (findCarPlacaExists) {
      throw new AppError('Esta placa já foi cadastrado!')
    }

    const findCarRenavamExists = await carRespository.findOne({
      where: { renavam, id: Not(Equal(id)) },
    })

    if (findCarRenavamExists) {
      throw new AppError('Esta renavam já foi cadastrado!')
    }

    const findCarChassiExists = await carRespository.findOne({
      where: { chassi, id: Not(Equal(id)) },
    })

    if (findCarChassiExists) {
      throw new AppError('Esta chassi já foi cadastrado!')
    }

    const car = carRespository.create({
      id,
      ano,
      chassi,
      marca,
      modelo,
      placa,
      renavam,
    })

    await carRespository.save(car)

    delete car.int_excluded

    return car
  }
}

export default CreateCarService
