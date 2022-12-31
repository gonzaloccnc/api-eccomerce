import Product from '../../../schemas/Product.js'

export const patchProduct = (req, res) => {
  const { id } = req.params;
  const updateProduct = req.body;
  Product.findByIdAndUpdate(id, { $set: { ...updateProduct } }, { new: true })
    .then((product) => {
      if (!product) throw { message: "Item not fount" };
      res.json(product);
    })
    .catch((err) => res.json(err));
}