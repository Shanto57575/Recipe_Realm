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
            return; // Add this line to return after sending response
        }
    } else {
        res.status(401).json({ message: "Unauthorized Access, No Token Found" })
        return; // Add this line to return after sending response
    }
});

export { verifyToken }