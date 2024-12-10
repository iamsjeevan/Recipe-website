const Recipe = require('../models/Recipe');

// @desc Create a new recipe
// @route POST /api/recipes
// @access Private
const createRecipe = async (req, res) => {
    const { title, ingredients, instructions, imageUrl } = req.body;

    try {
        const recipe = new Recipe({
            user: req.user._id,
            title,
            ingredients,
            instructions,
            imageUrl,
        });

        const createdRecipe = await recipe.save();
        res.status(201).json(createdRecipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Get all recipes
// @route GET /api/recipes
// @access Public
const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Get recipe by ID
// @route GET /api/recipes/:id
// @access Public
const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            res.status(404).json({ message: 'Recipe not found' });
            return;
        }

        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Update recipe
// @route PUT /api/recipes/:id
// @access Private
const updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            res.status(404).json({ message: 'Recipe not found' });
            return;
        }

        if (recipe.user.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }

        recipe.title = req.body.title || recipe.title;
        recipe.ingredients = req.body.ingredients || recipe.ingredients;
        recipe.instructions = req.body.instructions || recipe.instructions;
        recipe.imageUrl = req.body.imageUrl || recipe.imageUrl;

        const updatedRecipe = await recipe.save();
        res.json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Delete recipe
// @route DELETE /api/recipes/:id
// @access Private
const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            res.status(404).json({ message: 'Recipe not found' });
            return;
        }

        if (recipe.user.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }

        await recipe.remove();
        res.json({ message: 'Recipe removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createRecipe,
    getRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
};
