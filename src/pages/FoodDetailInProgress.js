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
            className="display-6 text-center text-uppercase mt-3"
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
          <hr />
          {/* <div className="d-flex flex-column align-items-center mt-3">
            {recipeDetails.ingredients.map((ingredient, index) => (
              <label
                className="text-muted text-lowercase"
                key={ index }
                htmlFor={ `ingredient-${index}` }
              >
                <input
                  data-testid={ `${index}-ingredient-step` }
                  className="ml-2 mr-2"
                  name={ `ingredient-${index}` }
                  type="checkbox"
                />
                { `${ingredient[0]}: ${ingredient[1]}` }
              </label>
            ))}
          </div> */}
          <hr />
          <h3 className="text-center">Instructions</h3>
          <div className="d-flex flex-row justify-content-center">
            <div className="w-75">
              <p className="text-muted text-left">{recipeDetails.strInstructions}</p>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-success btn btn-primary btn-lg mb-3"
              type="button"
              data-testid="finish-recipe-btn"
            >
              Finish Recipe

            </button>
          </div>
        </>
      )}
    </div>

  );
};

FoodDetailInProgress.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,

};

export default FoodDetailInProgress;
