import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const cnxMongo = () => {
  mongoose
    .connect(process.env.URI_MONGO)
    .then()
    .catch(err => console.log(`Error: ${err}`))
}

export default cnxMongo
