import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import errorMiddleware from './middleware/error.middleware'
import routes from './routes'

const PORT = process.env.PORT || 3000
const app: Application = express()
morgan.token('type', function (req) {
  return req.headers['content-type']
})
app.use(morgan(':remote-addr :remote-user :method :url :status :type'))
app.use(express.json())

app.use('/image', routes)

app.get('/', (_: Request, res: Response) => {
  res.json({
    message: 'Welcome in our World 🌍',
  })
})

app.use(errorMiddleware)
app.use((_: Request, res: Response) => {
  res.status(404).json({ message: 'ohh no, Your lost read our documentation' })
})

app
  .listen(PORT, (): void => {
    console.log(`Server is starting at prot: ${PORT}`)
  })
  .on('error', (err: Error): void => console.error(err.message))

export default app
