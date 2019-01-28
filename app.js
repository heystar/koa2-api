import Koa from 'koa'
import mongoose from 'mongoose'
import convert from 'koa-convert'
import bodyparser from 'koa-bodyparser'
import { dbContect } from './src/config/mongodb'
import routes from './src/routes'
import { pipe } from './src/middleware/pipe'

const app = new Koa()

const { host, port, db, user, pass } = dbContect
mongoose.connect(
  `mongodb://${host}:${port}/${db}`,
  {
    user,
    pass
  }
)
app.use(bodyparser())
app.use(
  convert.compose(
    pipe,
    routes()
  )
)

// app.use(router.routes())

app.listen(3001)
