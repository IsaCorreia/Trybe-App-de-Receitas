import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [currentFilter, setCurrentFilter] = useState('All');
  const [mealsFilterRequest, setMealsFilterRequest] = useState([]);
  const [drinksFilterRequest, setDrinksFilterRequest] = useState([]);
  const [foodRequest, setFoodRequest] = useState([]);
  const [drinksRequest, setDrinksRequest] = useState([]);
  const [foodDetail, setFoodDetail] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isStartedRecipe, setIsStartedRecipe] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
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
    foodDetail,
    setFoodDetail,
    isFavorite,
    setIsFavorite,
    isStartedRecipe,
    setIsStartedRecipe,
    recommendations,
    setRecommendations,
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
