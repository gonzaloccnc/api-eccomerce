import Product from '../../../schemas/Product.js'

export const deleteProduct = (req, res) => {
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