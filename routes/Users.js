import { Router } from "express";
import User from "../schemas/User.js";

const userRouter = Router();

userRouter.get("/users", (req, res) => {
  const query = req.query;
  if (query.email !== undefined) {
    User.findOne({ email: query.email })
      .then((user) => {
        if (user === null) throw new Error("user not found");
        res.status(200).json(user);
      })
      .catch((error) => res.status(404).json({ err: error.message }));
  } else {
    User.find({})
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json({ error: err.message }));
  }
});

userRouter.post("/users", (req, res) => {
  const user = req.body;
  if (!Object.entries(user).length) {
    return res.status(400).json({
      error: "must have content",
    });
  }

  const newUser = new User({
    username: user.username,
    password: user.password,
    email: user.email,
  });

  newUser
    .save()
    .then((saveUser) => {
      res.status(201).json(saveUser);
    })
    .catch((err) => {
      const { code } = err;
      if (code === 11000)
        res.status(400).json({ error: "email or user duplicate" });
      else res.status(400).json(err);
    });
});

userRouter.get("/users/validate", (req, res) => {
  const query = req.query;
  if (query.email !== undefined) {
    User.findOne({ email: query.email })
      .then((user) => {
        if (user === null) res.json({ find: false });
        else res.json({ find: true });
      })
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    res.status(400).json({ error: "email undefined" });
  }
});

export default userRouter;
