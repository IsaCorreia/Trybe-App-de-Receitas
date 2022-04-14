import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import { DRINKS_DETAILS_ENDPOINT } from '../helpers/enpoints';
import favoriteRecipe from '../helpers/favoriteRecipe';
import finishRecipe from '../helpers/finishRecipe';
import objectConstructor from '../helpers/objectConstructor';
import useCheckForFavorite from '../hooks/useCheckForFavorite';
import useDetailsRequest from '../hooks/useDetailsRequest';
import useSaveRecipe from '../hooks/useSaveRecipe';
import useVerifyCheckbox from '../hooks/useVerifyCheckbox';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const DrinkDetailInProgress = (props) => {
  const { location: { pathname } } = props;
  const { history } = props;
  const ID = pathname.replace(/\D/g, '');

  const [isDoneButtonDisabled, setIsDoneButtonDisabled] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [shareStatus, setShareStatus] = useState(false);

  const {
    recipeDetails,
    setRecipeDetails,
    stateIngredient,
    setStateIngredient } = useContext(RecipesContext);

  useDetailsRequest(DRINKS_DETAILS_ENDPOINT(ID), setRecipeDetails, 'drinks');
  useSaveRecipe(ID, stateIngredient, setStateIngredient);
  useVerifyCheckbox(setIsDoneButtonDisabled);
  useCheckForFavorite(ID, setIsFavorite);

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

  const handleFavorite = () => {
    const teste = favoriteRecipe(objectConstructor('drink', recipeDetails), ID);
    setIsFavorite(teste);
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
            onClick={ () => {
              navigator.clipboard.writeText(
                `http://localhost:3000/drinks/${ID}`,
              );
              setShareStatus(true);
            } }
          >
            Compartilhar
          </button>
          {shareStatus && <p>Link copied!</p>}
          <button
            className="d-flex mx-auto "
            type="button"
            onClick={ handleFavorite }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="favorite"
            />
          </button>
          <hr />
          <div className="d-flex flex-column align-items-center mt-3">
            {Object.values(recipeDetails.ingredients).map((ingredient, index) => (
              <label
                className="text-muted text-lowercase"
                data-testid={ `${index}-ingredient-step` }
                key={ index }
                htmlFor={ `${index + 1}` }
              >
                <input
                  type="checkbox"
                  name={ `${index + 1}` }
                  checked={ stateIngredient.cocktails[ID]
                  && stateIngredient.cocktails[ID].includes(`${index + 1}`) }
                  onChange={ handleIngredient }
                />
                <span>
                  {`${Object.keys(ingredient)[0]} - ${Object.values(ingredient)[0]}`}
                </span>
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
              disabled={ isDoneButtonDisabled }
              onClick={ () => finishRecipe(ID, history,
                objectConstructor('drink', recipeDetails)) }
            >
              Finish Recipe

            </button>
          </div>
        </>
      )}
    </div>

  );
};

DrinkDetailInProgress.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DrinkDetailInProgress;
