import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import { RECIPE_DETAILS_ENDPOINT } from '../helpers/enpoints';
import useDetailsRequest from '../hooks/useDetailsRequest';

const FoodDetailInProgress = ({ location: { pathname } }) => {
  const SEVEN = 7;
  const TWELVE = 12;
  const ID = pathname.slice(SEVEN, TWELVE);
  const { recipeDetails, setRecipeDetails } = useContext(RecipesContext);

  // create an array with the ingredients and measure of each ingredient concatanating strIngredient and strMeasure

  // const ingredients = Object.keys(recipeDetails[0]);

  // console.log(ingredients);

  useDetailsRequest(RECIPE_DETAILS_ENDPOINT(ID), setRecipeDetails, 'meals');

  return (
    <div>
      { recipeDetails.strMeal?.length > 0
      && (
        <>
          <img
            data-testid="recipe-photo"
            className="img-fluid thumbnail"
            src={ recipeDetails.strMealThumb }
            alt={ recipeDetails.strMeal }
          />
          <h1
            data-testid="recipe-title"
            className="display-6 text-center text-uppercase"
          >
            {recipeDetails.strMeal}
          </h1>
          <p
            className="text-center text-muted text-lowercase"
          >
            {recipeDetails.strCategory}

          </p>
          <button
            data-testid="favorite-btn"
            type="button"
            className="btn btn-outline-info btn-lg btn-block"
            onClick={ () => console.log('compartilhou') }
          >
            Compartilhar

          </button>
        </>
      )}
    </div>
  );
};

FoodDetailInProgress.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,

};

export default FoodDetailInProgress;
