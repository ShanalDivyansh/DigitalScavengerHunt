import express from 'express'
import { getAllUsers } from '../Controller/userController.js'
const userRouter = express.Router()
userRouter.route("/").get(getAllUsers)
export{userRouter}