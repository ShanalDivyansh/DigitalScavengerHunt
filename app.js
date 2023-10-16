import express from 'express'
import { userRouter } from './Routes/userRoutes.js'
const app = express()

// Global middleware 
app.use(express.json())

// Parent routes
app.use("/api/v1/users",userRouter)


export {app}

