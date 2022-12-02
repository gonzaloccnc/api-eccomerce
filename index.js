import express from "express";
import cnxMongo from "./config/cnxMongo.js";
import cors from "cors";
import productRouter from "./routes/Products.js";
import dotennv from "dotenv";
import RootRouter from "./routes/Root.js";
import compression from "compression";
import userRoter from "./routes/Users.js";

const app = express();

dotennv.config();
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
