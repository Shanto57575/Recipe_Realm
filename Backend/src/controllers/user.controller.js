import asyncHandler from "express-async-handler"
import User from "../models/user.model.js"

const authUser = asyncHandler(async (req, res) => {
    const userdata = req.body

    const existingUser = await User.findOne({ email: userdata?.email })
    console.log(existingUser)

    try {
        if (existingUser) {
            res.status(200).json({ message: "Successfully Logged In", user: existingUser })
        } else {
            const newUser = new User(userdata)
            await newUser.save()
            res.status(201).json({ message: "User registration successfull!", user: newUser })
        }
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

export {
    authUser
}