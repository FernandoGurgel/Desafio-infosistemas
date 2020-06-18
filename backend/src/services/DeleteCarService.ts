import { getRepository } from 'typeorm'

import Car from '../models/Car'
import AppError from '../errors/AppError'

interface carDTO {
  id: string
}

class DeleteCarService {
  public async execute({ id }: carDTO): Promise<Car> {
    const carRespository = getRepository(Car)
    const findById = carRespository.findOne({ where: { id } })

    if (!findById) {
      throw new AppError('Este id é invalido')
    }

    const car = carRespository.create({
      id,
      int_excluded: true,
    })

    await carRespository.remove(car)

    return car
  }
}

export default DeleteCarService
