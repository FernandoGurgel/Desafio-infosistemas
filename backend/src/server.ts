import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'

import routes from './routes'
import './database'
import AppError from './errors/AppError'

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  console.log(err)

  return response.status(500).json({
    status: 'Error',
    message: 'Internal server error',
  })
})

app.listen(3333, () => {
  console.log('🚀 Iniciando servidor node na porta 3333')
})

export default app
