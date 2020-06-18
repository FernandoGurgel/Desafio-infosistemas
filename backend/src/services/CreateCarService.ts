import { getRepository } from 'typeorm'

import Car from '../models/Car'
import AppError from '../errors/AppError'

interface carDTO {
  placa: string
  chassi: string
  renavam: number
  modelo: string
  marca: string
  ano: number
}

class CreateCarService {
  public async execute({
    ano,
    chassi,
    marca,
    modelo,
    placa,
    renavam,
  }: carDTO): Promise<Car> {
    const carRespository = getRepository(Car)
    const findCarPlacaExists = await carRespository.findOne({
      where: { placa },
    })

    if (findCarPlacaExists) {
      throw new AppError('Esta placa já foi cadastrado!')
    }

    const findCarRenavamExists = await carRespository.findOne({
      where: { renavam },
    })

    if (findCarRenavamExists) {
      throw new AppError('Esta renavam já foi cadastrado!')
    }

    const findCarChassiExists = await carRespository.findOne({
      where: { chassi },
    })

    if (findCarChassiExists) {
      throw new AppError('Esta chassi já foi cadastrado!')
    }

    const car = carRespository.create({
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
