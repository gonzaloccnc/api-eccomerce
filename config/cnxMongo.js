import mongoose from 'mongoose'
import 'dotenv/config'

const cnxMongo = () => {
  mongoose
    .connect(process.env.URI_MONGO)
    .then(() => console.log("Data base connected"))
    .catch(err => console.log(`Error: ${err}`))
}

export default cnxMongo
