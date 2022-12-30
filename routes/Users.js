import { Router } from "express";
import { authUser } from "../controllers/user/auth/authUser.js";
import { postUsers } from "../controllers/user/post/postUser.js";

const userRouter = Router();

userRouter.post("/users", postUsers);

userRouter.post("/users/auth", authUser);

export default userRouter;
