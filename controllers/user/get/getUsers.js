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
    res.status(404).json({ error: "email and password is required" })
  }
}