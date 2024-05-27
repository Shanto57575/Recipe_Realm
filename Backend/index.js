import express from 'express';
import dotenv from 'dotenv'
import connectDB from './src/db/connectDB.js';
import userRouter from './src/routes/user.routes.js';
import recipeRouter from './src/routes/recipe.routes.js';
import { errorHandler } from './src/middlewares/errorHandler.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import paymentRouter from './src/routes/payment.routes.js';

const app = express()
dotenv.config()

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.status(200).json({ message: "Dishcraft api is working !" })
})

app.use('/api/user', userRouter)
app.use('/api/recipe', recipeRouter)
app.use('/api/payment', paymentRouter)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`DishCraft Server is running on port ${port}`)
    connectDB()
})
