import supertest from 'supertest'
import app from '../index'

const request = supertest(app)
describe('Endpoint', () => {
  it('/', async () => {
    const response: supertest.Response = await request.get('/')
    expect(response.status).toBe(200)
  })
})
