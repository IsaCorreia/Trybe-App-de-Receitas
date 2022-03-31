import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [foodInitialRequest, setFoodInitialRequest] = useState([]);
  const [drinksInitialRequest, setDrinksInitialRequest] = useState([]);
  const recipesValues = {
    foodInitialRequest,
    setFoodInitialRequest,
    drinksInitialRequest,
    setDrinksInitialRequest,
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
