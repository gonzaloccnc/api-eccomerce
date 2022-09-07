import mongoose from 'mongoose'
import PriceDiscont from '../helpers/Discount.js'

const SchemmaProduct = mongoose.Schema({
  nameProduct: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  isSale: {
    type: Boolean,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  priceSale: {
    type: Number,
    required: false,
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
    trim: true,
  },
  imgURL: {
    type: String,
    required: true,
    trim: true,
  },
})

SchemmaProduct.set('toJSON', {
  transform: (document, returnedObject) => {
    const newPrice = PriceDiscont(returnedObject)
    if (returnedObject.isSale) {
      returnedObject.priceSale = Number(newPrice.toFixed(2))
    }
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Product = mongoose.model('Product', SchemmaProduct)
export default Product
