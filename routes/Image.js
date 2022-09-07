import { Router } from 'express'
import imageController from '../Controllers/ImageController.js'

const imageRouter = Router()

imageRouter.get('/images/:type/:image', imageController.getImage)

export default imageRouter
