import mongoose from "mongoose";
import asyncHandler from "express-async-handler"

const connectDB = asyncHandler(async () => {
    try {
        const connectionData = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`MongoDB connected successfully !!! HOST : ${connectionData.connection.host}`)
    } catch (error) {
        console.log(`Mongodb connection failed : ${error.message}`)
        throw new Error(`MongoDB connection failed`)
    }

})

export default connectDB