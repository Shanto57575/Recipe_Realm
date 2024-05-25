import express from 'express';
import { add_Recipe } from '../controllers/recipe.controller.js';

const recipeRouter = express.Router()

recipeRouter.route('/add-recipe').post(add_Recipe)

export default recipeRouter