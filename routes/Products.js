import { Router } from "express";
import { deleteProduct } from "../controllers/products/delete/deleteProduct.js";
import { getAllProducts } from "../controllers/products/get/getAllProducts.js";
import { getProductById } from "../controllers/products/get/getProductById.js";
import { middlewareGetProducts } from "../controllers/products/middleware/getProducts.js";
import { patchProduct } from "../controllers/products/patch/patchProduct.js";
import { postProduct } from "../controllers/products/post/postProduct.js";

const productRouter = Router();

productRouter.get("/products", middlewareGetProducts);

productRouter.get("/products", getAllProducts);

productRouter.get("/products/:id", getProductById);

productRouter.post("/products", postProduct);

productRouter.patch("/products/:id", patchProduct);

productRouter.delete("/products/:id", deleteProduct);

export default productRouter;
