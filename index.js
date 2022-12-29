import express from "express";
import cnxMongo from "./config/cnxMongo.js";
import cors from "cors";
import productRouter from "./routes/Products.js";
import "dotenv/config.js";
import RootRouter from "./routes/Root.js";
import compression from "compression";
import userRoter from "./routes/Users.js";
import { authUsers } from "./controllers/user/middlewares/authRoutes.js";
import { validateAccess } from "./controllers/products/middleware/validateAccess.js";

const app = express()

app.all('/api/products', validateAccess)
app.all('/api/products/:id', validateAccess)
app.use(authUsers)
app.use('/api/images', express.static('public/Images'))
app.use(compression());
app.use(cors());
app.use(express.json()); // parsea el req.body de las peticiones post

app.use(RootRouter);
app.use("/api", productRouter);
app.use("/api", userRoter);

const PORT = process.env.PORT || 4050;
app.listen(PORT, () => {
  cnxMongo();
});
