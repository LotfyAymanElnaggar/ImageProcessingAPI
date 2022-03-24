import supertest, { Response } from 'supertest'
import app from '../index'
import path from 'path'
import processImage from '../utils/imageProcessing'

const request = supertest(app)
describe('Endpoint', () => {
  it('/', async () => {
    const response: Response = await request.get('/')
    expect(response.status).toBe(200)
  })
})

describe('Image processing', () => {
  it('Should resize image', async () => {
    const name = 'encenadaport'
    const height = 500
    const width = 2000
    const targetLocation = `${path.resolve(
      './public/thumb/'
    )}/${name}_${height}_${width}.jpg`

    expect(async () => {
      await processImage({
        imgSource: path.resolve('./public/full') + name,
        targetLocation,
        width,
        height,
      })
    }).not.toThrow()
  })
})
