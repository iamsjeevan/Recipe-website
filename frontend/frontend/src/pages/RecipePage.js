import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecipePage = () => {
  const { id } = useParams();  // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) {
        setError('Recipe not found.');
      }
    };
    
    fetchRecipe();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {recipe ? (
        <div>
          <h2>{recipe.name}</h2>
          <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
          <p><strong>Instructions:</strong> {recipe.instructions}</p>
          {/* Add more recipe details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RecipePage;
