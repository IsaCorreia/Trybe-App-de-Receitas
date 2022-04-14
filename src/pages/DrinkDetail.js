import React, { useContext, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import copy from 'clipboard-copy';
import toast, { Toaster } from 'react-hot-toast';
import RecipeContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import reducerRecipeDetail from '../helpers/reduceRecipeDetails';
import { getRecipes } from '../services/fetchFoods';
import {
  updateLocalStorage,
  newStorage,
  loadStorage,
  filterItemById,
} from '../services/updateLocalStorage';
import Card from '../components/Card';
import StartButton from '../components/StartButton';

const DrinkDetail = () => {
  const {
    params: { id },
    url,
  } = useRouteMatch();
  const { push } = useHistory();
  const MAX_RECOMMENDATIONS = 6;

  const { drinkDetail, setDrinkDetail } = useContext(RecipeContext);
  const { recommendations, setRecommendations } = useContext(RecipeContext);
  const { isFavorite, setIsFavorite } = useContext(RecipeContext);
  const { isStartedRecipe, setIsStartedRecipe } = useContext(RecipeContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const { drinks } = await response.json();
        setDrinkDetail(drinks[0]);
      } catch (error) {
        console.error(error);
      }
    })();
    (async () => {
      const { meals } = await getRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setRecommendations(meals);
    })();

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (favoriteRecipes) {
      setIsFavorite(favoriteRecipes.some((recipe) => recipe.id === id));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }

    const inProgressRecipes = loadStorage('inProgressRecipes');

    if (inProgressRecipes) {
      const isRecipeInProgress = Object.keys(inProgressRecipes.cocktails)
        .some((cocktailId) => cocktailId === id);
      setIsStartedRecipe(isRecipeInProgress);
    } else {
      newStorage('inProgressRecipes', {
        cocktails: {},
        meals: {},
      });
    }
  }, [id, setDrinkDetail, setIsFavorite, setIsStartedRecipe, setRecommendations]);

  if (!drinkDetail) {
    return <p>Loading...</p>;
  }

  const favoriteThisRecipe = () => {
    updateLocalStorage('favoriteRecipes', {
      id: drinkDetail.idDrink,
      type: 'drink',
      nationality: '',
      category: drinkDetail.strCategory,
      alcoholicOrNot: drinkDetail.strAlcoholic,
      name: drinkDetail.strDrink,
      image: drinkDetail.strDrinkThumb,
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
    copy(`http://localhost:3000/foods/${drinkDetail.idDrink}`);
    toast.success('Link copied!');
  };

  return (
    <>
      <div><Toaster /></div>
      <img
        src={ drinkDetail.strDrinkThumb }
        alt={ drinkDetail.strDrink }
        data-testid="recipe-photo"
      />
      <main>
        <h2 data-testid="recipe-title">{drinkDetail.strDrink}</h2>
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
        <p data-testid="recipe-category">{drinkDetail.strAlcoholic}</p>
        <section>
          <h3>Ingtredients</h3>
          <ol>
            {reducerRecipeDetail(drinkDetail).map((value, index) => (
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
          <p data-testid="instructions">{drinkDetail.strInstructions}</p>
        </section>
        <section>
          <h2>Recommendations</h2>
          <div>
            {recommendations
              ?.slice(0, MAX_RECOMMENDATIONS)
              .map(
                ({ strMealThumb, strCategory, idMeal, strMeal }, index) => (
                  <Card
                    key={ idMeal }
                    index={ index }
                    src={ strMealThumb }
                    name={ strMeal }
                    strType={ strCategory }
                    dataTestId={ {
                      container: '-recommendation-card',
                      paragraph: '-recommendation-title',
                    } }
                  />
                ),
              )}
          </div>
        </section>
        <StartButton
          dataTestId="start-recipe-button"
          buttonName={ isStartedRecipe ? 'Continue Recipe' : 'Start Recipe' }
          handleClick={ redirect }
        />
      </main>
    </>
  );
};

export default DrinkDetail;
