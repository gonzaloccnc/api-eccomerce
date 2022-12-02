import { Router } from "express";
import { authUser } from "../controllers/user/authUser.js";
import { getUsers } from "../controllers/user/get/getUsers.js";
import { postUsers } from "../controllers/user/postUser.js";

const userRouter = Router();

userRouter.get("/users", getUsers);

userRouter.post("/users", postUsers);

userRouter.post("/users/auth", authUser);

export default userRouter;
