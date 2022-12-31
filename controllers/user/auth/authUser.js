import User from "../../../schemas/User.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import 'dotenv/config'

export const authUser = async (req, res) => {
  const query = req.query;
  try {
    const user = await User.findOne({ email: query.email })

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(query.password, user.password)

    if (!(user && passwordCorrect)) {
      return res.status(400).json({ error: 'invalid user or password' })
    }

    const userToken = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: "user"
    }

    const token = jwt.sign(userToken, process.env.SECRET, { expiresIn: '1w' })

    res.json({
      token
    })
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}