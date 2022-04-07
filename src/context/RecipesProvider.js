import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [currentFilter, setCurrentFilter] = useState('All');
  const [mealsFilterRequest, setMealsFilterRequest] = useState([]);
  const [drinksFilterRequest, setDrinksFilterRequest] = useState([]);
  const [foodRequest, setFoodRequest] = useState([]);
  const [drinksRequest, setDrinksRequest] = useState([]);
<<<<<<< .merge_file_1g3tJR
  const [foodDetail, setFoodDetail] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
=======
  const [recipeDetails, setRecipeDetails] = useState({});

>>>>>>> .merge_file_VroAd6
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
<<<<<<< .merge_file_1g3tJR
    foodDetail,
    setFoodDetail,
    recommendations,
    setRecommendations,
=======
    recipeDetails,
    setRecipeDetails,
>>>>>>> .merge_file_VroAd6
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
