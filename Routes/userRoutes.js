import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../Controller/userController.js";
import * as auth from "../Controller/authController.js";
const userRouter = express.Router();
userRouter.route("/signup").post(auth.signUp);
userRouter.route("/login").post(auth.logIn);
userRouter.route("/").get([auth.protect], getAllUsers);
userRouter
  .route("/:id")
  .get([auth.protect], getUser)
  .patch([auth.protect], updateUser)
  .delete([auth.protect], deleteUser);
export { userRouter };
