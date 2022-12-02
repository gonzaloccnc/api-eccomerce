export const getAllProducts = (req, res) => {
  Product.find({}).then((products) => {
    res.json(products);
  });
}