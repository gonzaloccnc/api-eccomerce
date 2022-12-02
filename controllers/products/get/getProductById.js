export const getProductById = (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((product) => {
      if (!product) throw { error: "Product not found" };
      res.status(200).json(product);
    })
    .catch((err) => res.status(404).json(err));
}