import { Router } from "express";
import { deleteProduct } from "../controllers/products/delete/deleteProduct.js";
import { getAllProducts } from "../controllers/products/get/getAllProducts.js";
import { getProductById } from "../controllers/products/get/getProductById.js";
import { middlewareGetProducts } from "../controllers/products/middleware/getProducts.js";
import { patchProduct } from "../controllers/products/patch/patchProduct.js";
import { postProduct } from "../controllers/products/post/postProduct.js";
import { validateAccess } from "../controllers/products/middleware/validateAccess.js";

const productRouter = Router();

productRouter.get("/products", middlewareGetProducts, getAllProducts);

productRouter.get("/products/:id", getProductById);

productRouter.post("/products", validateAccess, postProduct);

productRouter.patch("/products/:id", validateAccess, patchProduct);

productRouter.delete("/products/:id", validateAccess, deleteProduct);

export default productRouter;
