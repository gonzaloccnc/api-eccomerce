import { Router } from 'express'

const RootRouter = Router()

RootRouter.get('/', (req, res) => {
  res.redirect('/api/products')
})

export default RootRouter
