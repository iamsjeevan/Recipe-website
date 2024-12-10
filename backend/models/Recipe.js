const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: [true, 'Please enter a recipe title'],
        },
        ingredients: {
            type: String,
            required: [true, 'Please enter ingredients'],
        },
        instructions: {
            type: String,
            required: [true, 'Please enter cooking instructions'],
        },
        imageUrl: {
            type: String,
            required: [true, 'Please provide an image URL'],
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
