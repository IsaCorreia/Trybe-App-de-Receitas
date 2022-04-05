import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import RecipesContext from '../context/RecipesContext';
import { fetchFoodByIngredient } from '../services/fetchFoods';

function IngredientCard({ index, ingredientName, ingredientImage, type }) {
  const { setRecipesAPI } = useContext(AppContext);
  const { setFoodRequest } = useContext(RecipesContext);
  const history = useHistory();

  const verifyIfRecipeFound = (recipes) => {
    if (!recipes) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const handleClick = async () => {
    let recipes = [];
    if (type === 'foods') {
      recipes = await fetchFoodByIngredient(ingredientName);
      verifyIfRecipeFound(recipes);
      setRecipesAPI(recipes);
      setFoodRequest(recipes);
    }
    history.push(`/${type}`, { from: `/explore/${type}/ingredients` });
  };
  return (
    <div
      data-testid={ `${index}-ingredient-card` }
      className="card-recipe"
    >
      <button
        type="button"
        onClick={ handleClick }
      >
        <img
          src={ ingredientImage }
          alt={ ingredientName }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{ingredientName}</p>
      </button>
    </div>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  ingredientName: PropTypes.string.isRequired,
  ingredientImage: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default IngredientCard;
