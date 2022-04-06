import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import { DRINKS_DETAILS_ENDPOINT } from '../helpers/enpoints';
import useDetailsRequest from '../hooks/useDetailsRequest';
import useSaveRecipe from '../hooks/useSaveRecipe';

const DrinksDetailInProgress = ({ location: { pathname } }) => {
  const SEVEN = 8;
  const TWELVE = 13;
  const ID = pathname.slice(SEVEN, TWELVE);

  const {
    recipeDetails,
    setRecipeDetails,
    stateIngredient,
    setStateIngredient } = useContext(RecipesContext);

  useDetailsRequest(DRINKS_DETAILS_ENDPOINT(ID), setRecipeDetails, 'drinks');
  useSaveRecipe(ID, stateIngredient, setStateIngredient);

  const handleIngredient = ({ target: { name } }) => {
    if (stateIngredient.cocktails[ID] === undefined) {
      setStateIngredient({
        ...stateIngredient,
        cocktails: {
          ...stateIngredient.cocktails,
          [ID]: [name],
        },
      });
    } else if (stateIngredient.cocktails[ID].includes(name)) {
      console.log('ja tem');
      setStateIngredient({
        ...stateIngredient,
        cocktails: {
          ...stateIngredient.cocktails,
          [ID]: stateIngredient.cocktails[ID]
            .filter((ingredientEl) => ingredientEl !== name),
        },
      });
    } else {
      setStateIngredient({
        ...stateIngredient,
        cocktails: {
          ...stateIngredient.cocktails,
          [ID]: [...stateIngredient.cocktails[ID], name],
        },
      });
    }
  };

  return (
    <div>
      { recipeDetails.strDrink?.length > 0
      && (
        <>
          <img
            data-testid="recipe-photo"
            className="img-fluid thumbnail"
            src={ recipeDetails.strDrinkThumb }
            alt={ recipeDetails.strDrink }
          />
          <h1
            data-testid="recipe-title"
            className="display-6 text-center text-uppercase mt-3"
          >
            {recipeDetails.strDrink}
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
            data-testid="favorite-btn"
            type="button"
            className="btn btn-outline-info btn-lg btn-block"
            onClick={ () => console.log('favoritou') }
          >
            Favoritar
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
                  checked={ stateIngredient.cocktails[ID]
                    && stateIngredient.cocktails[ID].includes(`${index + 1}`) }
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
                className="text-muted text-left"
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
            >
              Finish Recipe

            </button>
          </div>
        </>
      )}
    </div>

  );
};

DrinksDetailInProgress.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,

};

export default DrinksDetailInProgress;
