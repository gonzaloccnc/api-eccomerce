import User from "../../../schemas/User.js";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

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

    res.status(201).json(newUserJs)
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }

}