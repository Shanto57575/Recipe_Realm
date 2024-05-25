import asyncHandler from "express-async-handler"
import Recipe from "../models/recipe.model.js"

const add_Recipe = asyncHandler(async (req, res) => {
    const recipeData = req.body
    console.log(recipeData)
    try {
        const newRecipe = new Recipe(recipeData)
        await newRecipe.save()
        res.status(201).json({ message: "Your Recipe is added!", recipe: newRecipe })
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

export {
    add_Recipe
}