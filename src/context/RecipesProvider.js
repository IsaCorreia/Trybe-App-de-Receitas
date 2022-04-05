import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [currentFilter, setCurrentFilter] = useState('All');
  const [mealsFilterRequest, setMealsFilterRequest] = useState([]);
  const [drinksFilterRequest, setDrinksFilterRequest] = useState([]);
  const [foodRequest, setFoodRequest] = useState([]);
  const [drinksRequest, setDrinksRequest] = useState([]);
  const [ingredientsRequest, setIngredientsRequest] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState({});

  const recipesValues = {
    foodRequest,
    setFoodRequest,
    drinksRequest,
    setDrinksRequest,
    mealsFilterRequest,
    setMealsFilterRequest,
    drinksFilterRequest,
    setDrinksFilterRequest,
    currentFilter,
    setCurrentFilter,
    ingredientsRequest,
    setIngredientsRequest,
    recipeDetails,
    setRecipeDetails,
  };

  return (
    <RecipesContext.Provider value={ recipesValues }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
