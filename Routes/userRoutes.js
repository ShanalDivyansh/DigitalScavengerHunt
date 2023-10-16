import express from "express";
import { getAllUsers } from "../Controller/userController.js";
import * as auth from "../Controller/authController.js";
const userRouter = express.Router();
userRouter.route("/signup").get(auth.signUp);
userRouter.route("/login").get(getAllUsers);
userRouter.route("/").get(getAllUsers);
export { userRouter };
