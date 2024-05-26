import asyncHandler from "express-async-handler"
import User from "../models/user.model.js"
import Recipe from "../models/recipe.model.js"

const authUser = asyncHandler(async (req, res) => {
    const userdata = req.body
    const existingUser = await User.findOne({ email: userdata?.email })

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

        console.log("recipe==>", recipe);
        console.log("isExist==>", isExist);
        console.log("recipeCreator==>", recipeCreator);

        let updatedRecipe, updatedExistingUser, updatedCreator;

        if (recipe && !recipe.purchased_by.includes(email)) {
            recipe.watchCount += 1;
            recipe.purchased_by.push(email);
            updatedRecipe = await recipe.save();
        }

        if (isExist && !recipe.purchased_by.includes(email)) {
            isExist.coin = newCoin || isExist.coin;
            updatedExistingUser = await isExist.save();
            console.log("updatedExistingUser", updatedExistingUser);
        }

        if (recipeCreator && !recipe.purchased_by.includes(email)) {
            recipeCreator.coin += 1;
            updatedCreator = await recipeCreator.save();
        }

        const updatedData = [{ recipe: updatedRecipe }, { user: updatedExistingUser }, { creator: updatedCreator }];

        if (updatedRecipe && updatedExistingUser && updatedCreator) {
            res.status(200).json({ message: "You Spent 10 coins", user: updatedData });
        } else {
            res.status(404).json({ message: "User Not Found or Recipe Already Purchased!" });
        }

    } catch (error) {
        res.status(500).json({ error });
        throw new Error(error.message);
    }
});

export {
    authUser,
    updateUser,
    singleUser
}