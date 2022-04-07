import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import { RECIPE_DETAILS_ENDPOINT } from '../helpers/enpoints';
import useDetailsRequest from '../hooks/useDetailsRequest';
import useSaveRecipe from '../hooks/useSaveRecipe';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const FoodDetailInProgress = (props) => {
  const { location: { pathname } } = props;
  const { history } = props;
  const ID = pathname.replace(/\D/g, '');

  const {
    recipeDetails,
    setRecipeDetails,
    stateIngredient,
    setStateIngredient } = useContext(RecipesContext);

  const [isDoneButtonDisabled, setIsDoneButtonDisabled] = useState(true);

  useDetailsRequest(RECIPE_DETAILS_ENDPOINT(ID), setRecipeDetails, 'meals');
  useSaveRecipe(ID, stateIngredient, setStateIngredient);

  const handleIngredient = ({ target: { name } }) => {
    if (stateIngredient.meals[ID] === undefined) {
      setStateIngredient({
        ...stateIngredient,
        meals: {
          ...stateIngredient.meals,
          [ID]: [name],
        },
      });
    } else if (stateIngredient.meals[ID].includes(name)) {
      setStateIngredient({
        ...stateIngredient,
        meals: {
          ...stateIngredient.meals,
          [ID]: stateIngredient.meals[ID].filter((ingredientEl) => ingredientEl !== name),
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

  useEffect(() => {
    const allInputs = document.getElementsByTagName('input');
    const arrFromInputs = Array.from(allInputs);
    const checkedInputs = arrFromInputs.filter((input) => input.checked);

    if (checkedInputs.length === arrFromInputs.length && checkedInputs.length > 0) {
      setIsDoneButtonDisabled(false);
    } else {
      setIsDoneButtonDisabled(true);
    }
  });

  const finishRecipe = () => {
    const previousLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (previousLocalStorage) {
      localStorage.setItem('doneRecipes', JSON.stringify([...previousLocalStorage, {
        id: ID,
      },
      ]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([{
        id: ID,
      },
      ]));
    }
    history.push('/done-recipes');
  };

  const favoriteRecipe = () => {
    const previousLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (previousLocalStorage) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...previousLocalStorage, {
        id: ID,
      },
      ]));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: ID,
      },
      ]));
    }
  };

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
            data-testid="recipe-category"
            className="text-center text-muted text-lowercase"
          >
            {recipeDetails.strCategory}
          </p>
          <button
            data-testid="share-btn"
            type="button"
            className="btn btn-outline-info btn-lg btn-block"
            onClick={ () => console.log('compartilhou') }
          >
            Compartilhar
          </button>
          <button
            className="d-flex mx-auto "
            data-testid="favorite-btn"
            type="button"
            onClick={ favoriteRecipe }
          >
            <img
              src={ whiteHeartIcon }
              alt="favorite"
            />
          </button>
          <hr />
          <div className="d-flex flex-column align-items-center mt-3">
            {Object.values(recipeDetails.ingredients).map((ingredient, index) => (
              <label
                key={ index }
                htmlFor={ `${index + 1}` }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  name={ `${index + 1}` }
                  type="checkbox"
                  checked={ stateIngredient.meals[ID]
                    && stateIngredient.meals[ID].includes(`${index + 1}`) }
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
              <p
                data-testid="instructions"
                className="text-muted text-left text-decoration-line-through"
              >
                {recipeDetails.strInstructions}

              </p>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-success btn btn-primary btn-lg mb-3"
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ isDoneButtonDisabled }
              onClick={ finishRecipe }
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
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FoodDetailInProgress;
