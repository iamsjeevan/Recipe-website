import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddRecipePage = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('ingredients', ingredients);
    formData.append('instructions', instructions);
    if (image) formData.append('image', image);

    try {
      await axios.post('http://localhost:2000/api/recipes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess(true);
      setTimeout(() => history.push('/'), 2000); // Redirect to homepage after success
    } catch (err) {
      setError('Failed to add recipe. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipe Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ingredients:</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Instructions:</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Recipe Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit">Add Recipe</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p>Recipe added successfully!</p>}
    </div>
  );
};

export default AddRecipePage;
