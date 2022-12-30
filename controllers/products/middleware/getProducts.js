import Product from "../../../schemas/Product.js";

export const middlewareGetProducts = (req, res, next) => {
  const host = req.protocol + "://" + req.get("host");
  Product.find({}).then((products) => {
    products.forEach((p) => {
      const { id, category, description, nameProduct } = p;
      Product.findByIdAndUpdate(
        id,
        {
          $set: {
            imgURL:
              host +
              "/api/images/" +
              category.replace(/ /g, "") +
              "/" +
              nameProduct.replace(/ /g, "") +
              "-" +
              description.replace(/ /g, "").replace('"', "p") +
              ".webp",
          },
        },
        { new: true }
      )
        .then()
        .catch((e) => console.error(e));
    });
  });

  next();
}