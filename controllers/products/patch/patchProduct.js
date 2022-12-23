import jwt from 'jsonwebtoken'
import Product from '../../../schemas/Product.js'

export const patchProduct = (req, res) => {

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

  const { id } = req.params;
  const updateProduct = req.body;
  Product.findByIdAndUpdate(id, { $set: { ...updateProduct } }, { new: true })
    .then((product) => {
      if (!product) throw { message: "Item not fount" };
      res.json(product);
    })
    .catch((err) => res.json(err));
}