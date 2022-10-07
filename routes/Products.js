import { Router } from 'express'
import Product from '../schemas/Product.js'

const productRouter = Router()

productRouter.get('/products', (req, res, next) => {
  const host = req.protocol + '://' + req.get('host')

  Product.find({}).then(products => {
    products.forEach(p => {
      const { id, category, description, nameProduct } = p
      Product.findByIdAndUpdate(
        id,
        {
          $set: {
            imgURL:
              host +
              '/api/images/' +
              category.replace(/ /g, '') +
              '/' +
              nameProduct.replace(/ /g, '') +
              '-' +
              description.replace(/ /g, '').replace('"', 'p') +
              '.webp',
          },
        },
        { new: true }
      )
        .then()
        .catch(e => console.error(e))
    })
  })

  next()
})

productRouter.get('/products', (req, res) => {
  Product.find({}).then(products => {
    res.json(products)
  })
})

productRouter.get('/products/:id', (req, res) => {
  const { id } = req.params
  Product.findById(id)
    .then(product => {
      if (!product) throw { error: 'Product not found' }
      res.status(200).json(product)
    })
    .catch(err => res.status(404).json(err))
})

productRouter.post('/products', (req, res) => {
  const product = req.body
  if (!Object.entries(product).length) {
    return res.status(400).json({
      error: 'must have content',
    })
  }

  const newProduct = new Product({
    nameProduct: product.nameProduct,
    category: product.category,
    description: product.description,
    type: product.type,
    isSale: product.isSale,
    price: product.price,
    stock: product.stock,
    imgURL: product.imgURL,
  })

  newProduct
    .save()
    .then(saveProduct => {
      res.status(201).json(saveProduct)
    })
    .catch(err => {
      res.status(400).json(err)
    })
})

productRouter.patch('/products/:id', (req, res) => {
  const { id } = req.params
  const updateProduct = req.body
  Product.findByIdAndUpdate(id, { $set: { ...updateProduct } }, { new: true })
    .then(product => {
      if (!product) throw { message: 'Item not fount' }
      res.json(product)
    })
    .catch(err => res.json(err))
})

productRouter.delete('/products/:id', (req, res) => {
  const { id } = req.params
  Product.findByIdAndRemove(id)
    .then(productRemove => {
      if (!productRemove) {
        throw { message: 'Item not found' }
      }
      res.status(200).json({ productRemove, message: 'The item was removed' })
    })
    .catch(err => res.status(400).json(err))
})

export default productRouter
