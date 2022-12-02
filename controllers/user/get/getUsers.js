import User from "../../../schemas/User.js";

export const getUsers = (req, res) => {
  const query = req.query;
  if (query.email !== undefined) {
    User.findOne({ email: query.email })
      .then(user => {
        if (user === null) throw new Error("user not found");
        res.status(201).json(user)
      })
      .catch(error => res.json({ err: error.message }));
  } else {
    User.find({})
      .then(users => res.json(users))
      .catch(err => res.status(500).json({ error: err.message }));
  }
}