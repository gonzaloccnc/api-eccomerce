import express from "express";
import cnxMongo from "./config/cnxMongo.js";
import cors from "cors";
import productRouter from "./routes/Products.js";
import "dotenv/config.js";
import RootRouter from "./routes/Root.js";
import compression from "compression";
import userRoter from "./routes/Users.js";

const app = express()

app.use(compression());
app.use(cors());
app.use(express.json()); // parsea el req.body de las peticiones
app.use(RootRouter);
app.use("/api", productRouter);
app.use("/api", userRoter);
app.use('/api/images', express.static('public/Images'))

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  cnxMongo();
});
