import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import asyncHandler from "express-async-handler"

const verifyToken = asyncHandler(async (req, res, next) => {
    let token = req.cookies.Access_Token

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = await User.findById(decoded.userId)
            next()
        } catch (error) {
            res.status(401).json({ message: "Invalid token" })
            throw new Error("Invalid token")
        }
    } else {
        res.status(401).json({ message: "Unauthorized Access, No Token Found" })
        throw new Error("Unauthorized Access, No Token Found")
    }
})

export { verifyToken }