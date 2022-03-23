import express, { Application } from 'express'
import morgan from 'morgan'

const PORT = process.env.PORT || 3000
const app: Application = express()

app.use(morgan('dev'))
app.use(express.json())

app.get('/', (_: express.Request, res: express.Response) => {
  res.json({
    message: 'Welcome in our World 🌍',
  })
})

app
  .listen(PORT, (): void => {
    console.log(`Server is starting at prot: ${PORT}`)
  })
  .on('error', (err: Error): void => console.error(err.message))

export default app
