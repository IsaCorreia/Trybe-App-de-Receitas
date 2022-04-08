import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import useRecipeInitialRequest from '../hooks/useRecipeInitialRequest';
import reducerRecipeDetail from '../helpers/reduceRecipeDetails';
import {
  updateLocalStorage,
  // newStorage,
  // loadSotorage,
  filterItemById,
} from '../services/updateLocalStorage';
import Card from '../components/Card';
import Button from '../components/Button';

const FoodDetail = ({
  match: {
    params: { id },
    url,
  },
}) => {
  // const {
  //   params: { id },
  //   url,
  // } = useRouteMatch();
  const { push } = useHistory();

  const FOOD_DETAILS_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const DRINKS_RECOMMENDATIONS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const MAX_RECOMMENDATIONS = 6;

  const { foodDetail, setFoodDetail } = useContext(RecipeContext);
  const { recommendations, setRecommendations } = useContext(RecipeContext);
  const { isFavorite, setIsFavorite } = useContext(RecipeContext);
  const { isStartedRecipe /* , setIsStartedRecipe */ } = useContext(RecipeContext);

  useRecipeInitialRequest(FOOD_DETAILS_URL, setFoodDetail, 'meals');
  useRecipeInitialRequest(DRINKS_RECOMMENDATIONS, setRecommendations, 'drinks');

  if (!foodDetail) {
    return <p>Loading...</p>;
  }

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
    idMeal,
    strArea,
  } = foodDetail[0];

  // const favoriteRecipes = JSON.parse(localStorage.getItem('favoriterecipes'));
  // if (favoriteRecipes) {
  //   setIsFavorite(favoriteRecipes.some((recipe) => recipe.id === id));
  // } else {
  //   localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  // }
  // const inProgressRecipes = localStorage('inProgressRecipes');
  // if (inProgressRecipes) {
  //   const isRecipesInProgress = Object.keys(inProgressRecipes.meals)
  //     .some((cocktailId) => cocktailId === id);
  //   setIsStartedRecipe(isRecipesInProgress);
  // } else {
  //   newStorage('inProgressRecipes', {
  //     cocktails: {},
  //     meals: {},
  //   });
  // }

  const favoriteThisRecipe = () => {
    updateLocalStorage('favoriterecipes', {
      id: idMeal,
      type: 'food',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    });
    setIsFavorite(true);
  };

  const removeFavorite = () => {
    filterItemById('favoriteRecipes', id);
    setIsFavorite(false);
  };

  const handleClick = () => {
    if (isFavorite) {
      removeFavorite();
      return;
    }
    favoriteThisRecipe();
  };

  const redirect = () => {
    push(`${url}/in-progress`);
  };

  const copyToClipBoard = () => {
    copy(`http://localhost:3000/foods/${idMeal}`);
    // TODO: mensagem de link copiado
  };

  return (
    <main>
      <header>
        <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
        <h1 data-testid="recipe-title">{strMeal}</h1>
      </header>
      <div>
        <input
          type="image"
          src={ shareIcon }
          alt="Share Icon"
          onClick={ copyToClipBoard }
          data-testid="share-btn"
        />
        <input
          name="favorite-btn"
          type="image"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="Favorite-Icon"
          onClick={ handleClick }
          data-testid="favorite-btn"
        />
      </div>
      <p data-testid="recipe-category">{strCategory}</p>
      <section>
        <h2>Ingtredients</h2>
        <ol>
          {reducerRecipeDetail(foodDetail[0]).map((value, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {value}
            </li>
          ))}
        </ol>
      </section>
      <section>
        <h3>Instructions</h3>
        <p data-testid="instructions">{strInstructions}</p>
      </section>
      <section>
        <div>
          <h2>Video</h2>
        </div>
        <iframe
          src={ strYoutube.replace('whatch?v=', 'embed/') }
          data-testid="video"
          title="YouTube video player"
          frameBorder="0"
          allow="
            accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture
          "
          allowFullScreen
        />
      </section>
      <section>
        <h2>Recommendations</h2>
        <div>
          {recommendations
            ?.slice(0, MAX_RECOMMENDATIONS)
            .map(
              ({ strDrinkThumb, strAlcoholic, idDrink, strDrink }, index) => (
                <Card
                  key={ idDrink }
                  index={ index }
                  src={ strDrinkThumb }
                  name={ strDrink }
                  strType={ strAlcoholic }
                  dataTestId={ {
                    container: '-recommendation-card',
                    paragraph: '-recommendation-title',
                  } }
                />
              ),
            )}
        </div>
      </section>
      <Button
        dataTestId="start-recipe-button"
        buttonName={ isStartedRecipe ? 'Continue Recipe' : 'Start Recipe' }
        handleClick={ redirect }
      />
    </main>
  );
};

FoodDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
};

export default FoodDetail;
