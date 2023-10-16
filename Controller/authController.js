import { User as userModel } from "../Model/userModel.js";
import jwt from "jsonwebtoken";
async function signUp(req, res) {
  try {
    const user = await userModel.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: {
        error,
      },
    });
  }
}
async function logIn(req, res) {}
export { signUp, logIn };
