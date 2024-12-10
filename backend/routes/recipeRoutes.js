const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createRecipe,
    getRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
} = require('../controllers/recipeController');

// Routes
router.post('/', protect, createRecipe);  // Create a new recipe
router.get('/', getRecipes);              // Get all recipes
router.get('/:id', getRecipeById);        // Get recipe by ID
router.put('/:id', protect, updateRecipe); // Update recipe by ID
router.delete('/:id', protect, deleteRecipe); // Delete recipe by ID

module.exports = router;
