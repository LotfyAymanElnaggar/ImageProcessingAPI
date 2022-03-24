import { Router } from 'express'
import imagesRoutes from './images.routes'

const routes: Router = Router()

routes.use(imagesRoutes)

export default routes
