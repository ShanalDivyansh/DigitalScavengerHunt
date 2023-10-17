import express from "express";
import { getAllUsers } from "../Controller/userController.js";
import * as auth from "../Controller/authController.js";
const userRouter = express.Router();
userRouter.route("/signup").post(auth.signUp);
userRouter.route("/login").post(auth.logIn);
userRouter.route("/").get([auth.protect], getAllUsers);
export { userRouter };
