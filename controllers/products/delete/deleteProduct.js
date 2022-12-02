export const deleteProduct = (req, res) => {
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
  Product.findByIdAndRemove(id)
    .then((productRemove) => {
      if (!productRemove) {
        throw { message: "Item not found" };
      }
      res.status(200).json({ productRemove, message: "The item was removed" });
    })
    .catch((err) => res.status(400).json(err));
}