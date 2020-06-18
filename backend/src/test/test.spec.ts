import { expect } from 'chai'
import { agent as request } from 'supertest'
import 'mocha'

import app from '../server'
import dummp from '../dummy/cars'

describe('TDD - InfoSistema', () => {
  const cars = dummp
  describe('POST', () => {
    cars.forEach((car) => {
      it(`Cadastra um novo carro ${car.placa}`, async () => {
        const res = await request(app).post('/cars').send(car)
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an('object')
      })
    })
    it(`Cadastra a uma placa ${cars[0].placa} já cadastrada`, async () => {
      const res = await request(app).post('/cars').send(cars[0])
      expect(res.status).to.equal(400)
      expect(res.body.message).to.equal('Esta placa já foi cadastrado!')
    })
  })

  describe('GET', () => {
    it('Buscar todos carros ', async () => {
      const res = await request(app).get('/cars')
      expect(res.status).to.equal(200)
      expect(res.body.length).to.equal(cars.length)
    })
    it(`Buscar pela placa ${cars[0].placa}`, async () => {
      const res = await request(app).get(`/cars/placa/${cars[0].placa}`)
      expect(res.status).to.equal(200)
      expect(res.body.length).to.equal(1)
    })
    it(`Buscar pela chassi ${cars[0].chassi}`, async () => {
      const res = await request(app).get(`/cars/chassi/${cars[0].chassi}`)
      expect(res.status).to.equal(200)
      expect(res.body.length).to.equal(cars.length)
    })
  })

  describe('UPDATE', () => {
    it(`Atualizar ano do carro ${dummp[1].placa}, ${dummp[1].ano}`, async () => {
      const car = dummp[1]
      car.ano = 2020
      const rest = await request(app).get(`/cars/placa/${car.placa}`)
      const res = await request(app).put(`/cars/${rest.body[0].id}`).send(car)
      expect(res.status).to.equal(200)
      expect(res.body.ano).to.equal(car.ano)
    })
  })

  describe('DELETE', () => {
    cars.forEach((car) => {
      it(`Excluir carro ${car.placa}`, async () => {
        const rest = await request(app).get(`/cars/placa/${car.placa}`)
        const res = await request(app).delete(`/cars/${rest.body[0].id}`)
        expect(res.status).to.equal(204)
      })
    })
  })
})
