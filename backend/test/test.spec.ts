import { expect } from 'chai'
import { agent as request } from 'supertest'
import 'mocha'

import app from '../src/server'
import dummp from '../src/dummy/cars'

describe('TDD - InfoSistema', () => {
  // Create POST
  describe('POST', () => {
    it('Cadastra um novo carro ', async () => {
      const res = await request(app).post('/cars').send(dummp[0])
      expect(res.status).to.equal(200)
      expect(res.body).not.to.to.be.empty
      expect(res.body.data).not.to.be.empty
      expect(res.body.data).to.be.an('object')
      expect(res.body.error).to.be.empty
    })
  })

  describe('GET', () => {
    it('always pass ', async () => {
      const res = await request(app).get('/cars')
      expect(res.status).to.equal(200)
    })
  })
})
