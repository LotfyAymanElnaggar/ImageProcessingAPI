import { Router, Request, Response } from 'express'
import path from 'path'
import fs, { existsSync } from 'fs'
import processImage from '../utils/imageProcessing'

const routes = Router()

// validate inputs image
// check if image name is passed
// check if image name is string
// check if height and width are passed
// check if height and width are numbers

// check if thumb folder exists OR create thumb folder
// check if image source exists OR return with message source not found
// check if image cashed in thumb folder
// create thumb image and cash in thumb folder OR return with message 'Image could not be processed'

routes.get('/', async (req: Request, res: Response): Promise<void> => {
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
  ) {
    res.status(400).json({ message: 'check your inputs' })
    return
  }

  const full = path.resolve('./public/full')
  const thumb = path.resolve('./public/thumb/')
  const imgLocation = `${full}/${name}.jpg`
  const thumbLocation = `${thumb}/${name}_${height}_${width}.jpg`

  // check if thumb folder exists OR create thumb folder
  if (!existsSync(thumb)) {
    try {
      fs.mkdirSync(thumb)
    } catch (err) {
      console.log(err)
    }
  }

  // check if image source exists OR return with message source not found
  if (!existsSync(imgLocation)) {
    res.status(404).json({
      message: 'Resource not found, this image does not exist!',
    })
    return
  }

  try {
    // check if image cashed in thumb folder
    if (!existsSync(thumbLocation))
      // create thumb image and cash in thumb folder OR return with message 'Image could not be processed'
      await processImage({
        imgSource: imgLocation,
        targetLocation: thumbLocation,
        width,
        height,
      })
    return res.sendFile(thumbLocation)
  } catch (err) {
    res.json({ error: 'Image could not be processed' })
  }
})

export default routes
