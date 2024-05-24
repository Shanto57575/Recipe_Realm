import express from 'express';
import dotenv from 'dotenv'
import connectDB from './src/db/connectDB.js';

const app = express()
dotenv.config()

const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.status(200).json({ message: "Dishcraft api is working !" })
})

app.listen(port, async () => {
    console.log(`DishCraft Server is running on port ${port}`)
    await connectDB()
})