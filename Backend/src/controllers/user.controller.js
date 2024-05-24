import asyncHandler from "express-async-handler"
import User from "../models/user.model.js"

const authUser = asyncHandler(async (req, res) => {
    const userdata = req.body

    const existingUser = await User.findOne({ email: userdata?.email })

    try {
        if (existingUser) {
            return res.status(409).json({ message: "Email Is Already In use!" })
        } else {
            const newUser = new User(userdata)
            await newUser.save()
            res.status(201).json({ message: "User registered successfully", newUser })
        }
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

export {
    authUser
}