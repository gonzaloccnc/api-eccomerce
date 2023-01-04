import User from "../../../schemas/User.js";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config()

export const postUsers = async (req, res) => {
  const user = req.body;
  if (!Object.entries(user).length) {
    return res.status(400).json({
      error: "must have content",
    });
  }

  try {
    const hash = await bcrypt.hash(user.password, 10)

    const newUser = new User({
      username: user.username,
      password: hash,
      email: user.email,
    });

    const newUserJs = await newUser.save()

    const userToken = {
      id: newUserJs.id,
      email: newUserJs.email,
      username: newUserJs.username,
      role: "user"
    }

    const token = jwt.sign(userToken, process.env.SECRET, { expiresIn: '1w' })
    res.status(201).json({ token })
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }

}