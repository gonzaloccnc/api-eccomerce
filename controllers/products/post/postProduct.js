import Product from "../../../schemas/Product.js";
import dotenv from "dotenv"
import jwt from 'jsonwebtoken'

dotenv.config()

export const postProduct = (req, res) => {

  const authorization = req.get('authorization')
  let token = null

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  let decodeToken = {}

  try {
    decodeToken = jwt.verify(token, process.env.SECRET)
  }
  catch (error) {
  }

  if (!token || decodeToken.role === 'user') {
    return res.status(401).json({ error: "token mising or not authorized" })
  }

  const product = req.body;
  if (!Object.entries(product).length) {
    return res.status(400).json({
      error: "must have content",
    });
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
  });

  newProduct
    .save()
    .then((saveProduct) => {
      res.status(201).json(saveProduct);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}