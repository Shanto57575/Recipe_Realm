import express from 'express';
import { add_Recipe, getAllRecipe, matchedRecipe, singleRecipe } from '../controllers/recipe.controller.js';

const recipeRouter = express.Router()

recipeRouter.route('/add-recipe').post(add_Recipe)
recipeRouter.route('/all-recipe').get(getAllRecipe)
recipeRouter.route('/all-recipe/:recipeId').get(singleRecipe)
recipeRouter.route('/all-recipe/match/:recipeId').get(matchedRecipe)

export default recipeRouter