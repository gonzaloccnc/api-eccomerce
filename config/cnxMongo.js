import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const cnxMongo = () => {
  mongoose
    .connect(process.env.URI_MONGO)
    .then(() => console.log('DataBase connected'))
    .catch(err => console.log(`Error: ${err}`))
}

export default cnxMongo
