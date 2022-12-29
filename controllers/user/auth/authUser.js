import User from "../../../schemas/User.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

export const authUser = async (req, res) => {
  const query = req.query;
  try {
    const user = await User.findOne({ email: query.email })

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(query.password, user.password)

    if (!(user && passwordCorrect)) {
      res.status(400).json({ error: 'invalid user or password' })
    }
    else {
      const host = req.get('host')

      // para pruebas en la bd test -> process.env.ENVIROMENT === 'DEVELOPMENT' ? 'admin' : 'user'
      const role = "user"

      const userToken = {
        id: user.id,
        email: user.email,
        username: user.username,
        role
      }

      const token = jwt.sign(userToken, process.env.SECRET, { expiresIn: '1w' })

      res.json({
        token
      })
    }
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}