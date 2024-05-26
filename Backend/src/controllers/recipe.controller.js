import asyncHandler from "express-async-handler"
import Recipe from "../models/recipe.model.js"

const add_Recipe = asyncHandler(async (req, res) => {
    const recipeData = req.body
    try {
        const newRecipe = new Recipe(recipeData)
        await newRecipe.save()
        res.status(201).json({ message: "Your Recipe is added!", recipe: newRecipe })
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const getAllRecipe = asyncHandler(async (req, res) => {
    try {
        const allRecipe = await Recipe.find({})
        res.status(200).json({ message: "All Recipe!", recipes: allRecipe })
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const singleRecipe = asyncHandler(async (req, res) => {
    const recipeId = req.params.recipeId;
    try {
        const recipe = await Recipe.findById(recipeId);
        if (recipe) {
            res.status(200).json(recipe);
        } else {
            res.status(404).json({ message: "Recipe not found" });
        }
    } catch (error) {
        // Error handling
        res.status(500).json({ error: error.message });
    }
});

export {
    add_Recipe,
    getAllRecipe,
    singleRecipe
}