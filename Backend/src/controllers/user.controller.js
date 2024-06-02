import asyncHandler from "express-async-handler"
import User from "../models/user.model.js"
import Recipe from "../models/recipe.model.js"
import generateToken from "../utils/generateToke.js"

const authUser = asyncHandler(async (req, res) => {
    const userdata = req.body
    const existingUser = await User.findOne({ email: userdata?.email })
    try {
        if (existingUser) {
            generateToken(res, existingUser._id)
            res.status(200).json({ message: "Successfully Logged In", user: existingUser })
        } else {
            generateToken(res, existingUser._id)
            const newUser = new User(userdata)
            await newUser.save()
            res.status(201).json({ message: "User registration successfull!", user: newUser })
        }
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const singleUser = asyncHandler(async (req, res) => {
    const { userId } = req.params

    try {
        const specificUser = await User.findById(userId)

        if (specificUser) {
            res.status(200).json({ message: "Successfully Logged In", user: specificUser })
        } else {
            res.status(201).json({ message: "User Not Found!" })
        }
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const { recipeId, email, newCoin } = req.body;
    const { userId } = req.params;

    try {
        const recipe = await Recipe.findById(recipeId);
        const isExist = await User.findById(userId);
        const recipeCreator = await User.findOne({ email: recipe?.email });

        let updatedRecipe, updatedExistingUser, updatedCreator;

        if (recipe) {
            recipe.watchCount += 1;
            recipe.purchased_by.push(email);
            updatedRecipe = await recipe.save();
        }

        if (isExist) {
            isExist.coin = newCoin || isExist.coin
            updatedExistingUser = await isExist.save();
        }

        if (recipeCreator) {
            recipeCreator.coin += 1;
            updatedCreator = await recipeCreator.save();
        }

        const updatedData = [{ recipe: updatedRecipe }, { user: updatedExistingUser }, { creator: updatedCreator }];

        if (updatedRecipe && updatedExistingUser && updatedCreator) {
            res.status(200).json({ message: "You Spent 10 coins", user: updatedData });
        } else {
            res.status(404).json({ message: "Not Found!" });
        }

    } catch (error) {
        res.status(500).json({ error });
        throw new Error(error.message);
    }
});

const logOutUser = asyncHandler(async (req, res) => {
    res.cookie("Access_Token", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: "Logged out successfully!" })
})

export {
    authUser,
    updateUser,
    singleUser,
    logOutUser
}