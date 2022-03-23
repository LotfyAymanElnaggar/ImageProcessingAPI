import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import path from 'path'
import sharp from 'sharp'
import errorMiddleware from './middleware/error.middleware'
import fs, { existsSync } from 'fs'

const PORT = process.env.PORT || 3000
const app: Application = express()
morgan.token('type', function (req) {
  return req.headers['content-type']
})
app.use(morgan(':remote-addr :remote-user :method :url :status :type'))
app.use(express.json())

interface Image {
  name?: string
  height?: number
  width?: number
}

app.get('/image', async (req: Request, res: Response) => {
  // validate inputs image
  // check if image name is passed
  // check if image name is string
  // check if height and width are passed
  // check if height and width are numbers

  // check if thumb folder exists OR create thumb folder
  // check if image source exists OR return with message source not found
  // check if image cashed in thumb folder
  // create thumb image and cash in thumb folder OR return with message 'Image could not be processed'

  const name = String(req.query.name)
  const height = Number(req.query.height)
  const width = Number(req.query.width)

  if (
    !name ||
    name === '' ||
    !height ||
    !width ||
    !Number(height) ||
    !Number(width)
  )
    return res.status(400).json({ message: 'check your inputs' })

  const t1: Image = {
    name,
    height,
    width,
  }

  const full = path.resolve('./public/full')
  const thumb = path.resolve('./public/thumb/')
  const imgLocation = `${full}/${t1.name}.jpg`
  const thumbLocation = `${thumb}/${t1.name}_${t1.height}_${t1.width}.jpg`

  // check if thumb folder exists OR create thumb folder
  if (!existsSync(thumb)) {
    try {
      fs.mkdirSync(thumb)
    } catch (err) {
      console.log(err)
    }
  }

  // check if image source exists OR return with message source not found
  if (!existsSync(imgLocation))
    return res.status(404).json({
      message: 'Resource not found, this image does not exist!',
    })

  try {
    // check if image cashed in thumb folder
    if (!existsSync(thumbLocation))
      // create thumb image and cash in thumb folder OR return with message 'Image could not be processed'
      await sharp(imgLocation).resize(t1.width, t1.height).toFile(thumbLocation)
    return res.sendFile(thumbLocation)
  } catch (err) {
    res.json({ error: 'Image could not be processed' })
  }
})

app.get('/', (_: Request, res: Response) => {
  res.json({
    message: 'Welcome in our World 🌍',
  })
})

app.post('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome in our World 🌍',
    body: req.body,
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
