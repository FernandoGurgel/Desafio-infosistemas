import * as express from 'express'

import routes from './routes'
import './database'

const app = express()

app.use(routes)

app.listen(3333, () => {
  console.log('🚀 Iniciando servidor node na porta 3333')
})

export default app
