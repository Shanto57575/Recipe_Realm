import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    ytvideocode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    watchCount: {
        type: Number,
        default: 0
    },
    purchased_by: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
