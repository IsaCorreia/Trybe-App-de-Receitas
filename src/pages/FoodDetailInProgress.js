import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import { RECIPE_DETAILS_ENDPOINT } from '../helpers/enpoints';
import useDetailsRequest from '../hooks/useDetailsRequest';
import useSaveInProgress from '../hooks/useSaveInProgressToState';

const FoodDetailInProgress = ({ location: { pathname } }) => {
  const SEVEN = 7;
  const TWELVE = 12;
  const ID = pathname.slice(SEVEN, TWELVE);

  const { recipeDetails, setRecipeDetails } = useContext(RecipesContext);
  const [stateIngredient, setStateIngredient] = useState({
    cocktails: {},
    meals: {
      [ID]: [] },
  });

  useDetailsRequest(RECIPE_DETAILS_ENDPOINT(ID), setRecipeDetails, 'meals');

  const handleIngredient = ({ target: { name } }) => {
    if (stateIngredient.meals[ID] === undefined) {
      setStateIngredient({
        ...stateIngredient,
        meals: {
          ...stateIngredient.meals,
          [ID]: [name],
        },
      });
    } else {
      setStateIngredient({
        ...stateIngredient,
        meals: {
          ...stateIngredient.meals,
          [ID]: [...stateIngredient.meals[ID], name],
        },
      });
    }
  };

  useSaveInProgress(stateIngredient, ID);
  // useEffect(() => {
  //   if (localStorage.getItem('inProgressRecipes')) {
  //     const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //     setStateIngredient(inProgressRecipes);
  //   }
  // }, [ID]);

  // useEffect(() => {
  //   localStorage.setItem('inProgressRecipes', JSON.stringify(stateIngredient));
  // }, [stateIngredient]);

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
          <div className="d-flex flex-column align-items-center mt-3">
            {Object.values(recipeDetails.ingredients).map((ingredient, index) => (
              <label
                className="text-muted text-lowercase"
                key={ index }
                htmlFor={ `${index + 1}` }
              >
                <input
                  data-testid={ `${index}-ingredient-step` }
                  className="ml-2 mr-2"
                  name={ `${index + 1}` }
                  type="checkbox"
                  checked={ stateIngredient.meals[ID].includes(`${index + 1}`) }
                  onChange={ (e) => handleIngredient(e) }
                />
                {`${Object.keys(ingredient)[0]} - ${Object.values(ingredient)[0]}`}
              </label>
            ))}
          </div>
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
