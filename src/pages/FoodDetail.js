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

const FoodDetail = () => {
  const {
    params: { id },
    url,
  } = useRouteMatch();
  const { push } = useHistory();
  const MAX_RECOMMENDATIONS = 6;

  const { foodDetail, setFoodDetail } = useContext(RecipeContext);
  const { recommendations, setRecommendations } = useContext(RecipeContext);
  const { isFavorite, setIsFavorite } = useContext(RecipeContext);
  const { isStartedRecipe, setIsStartedRecipe } = useContext(RecipeContext);

  // useRecipeInitialRequest(FOOD_DETAILS_URL, setFoodDetail, 'meals');
  // useRecipeInitialRequest(DRINKS_RECOMMENDATIONS, setRecommendations, 'drinks');
  useEffect(() => {
    (async () => {
      try {
        const { meals } = await getRecipes(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setFoodDetail(meals[0]);
      } catch (err) {
        console.error(err);
      }
    })();
    (async () => {
      const { drinks } = await getRecipes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setRecommendations(drinks);
    })();
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      setIsFavorite(favoriteRecipes.some((recipe) => recipe.id === id));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const inProgressRecipes = loadStorage('inProgressRecipes');
    if (inProgressRecipes) {
      const isRecipeInProgress = Object.keys(inProgressRecipes.meals)
        .some((cocktailId) => cocktailId === id);
      setIsStartedRecipe(isRecipeInProgress);
    } else {
      newStorage('inProgressRecipes', {
        cocktails: {},
        meals: {},
      });
    }
  // https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies
  }, [id, setFoodDetail, setIsFavorite, setIsStartedRecipe, setRecommendations]);

  if (!foodDetail) {
    return <p>Loading...</p>;
  }

  // const {
  //   strMealThumb,
  //   strMeal,
  //   strCategory,
  //   strInstructions,
  //   strYoutube,
  //   idMeal,
  //   strArea,
  // } = foodDetail;

  const favoriteThisRecipe = () => {
    updateLocalStorage('favoriteRecipes', {
      id: foodDetail.idMeal,
      type: 'food',
      nationality: foodDetail.strArea,
      category: foodDetail.strCategory,
      alcoholicOrNot: '',
      name: foodDetail.strMeal,
      image: foodDetail.strMealThumb,
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
    copy(`http://localhost:3000/foods/${foodDetail.idMeal}`);
    toast.success('Link copied!');
  };

  return (
    <>
      <div><Toaster /></div>
      <img
        src={ foodDetail.strMealThumb }
        alt={ foodDetail.strMeal }
        data-testid="recipe-photo"
      />
      <main>
        <h2 data-testid="recipe-title">{foodDetail.strMeal}</h2>
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
        <p data-testid="recipe-category">{foodDetail.strCategory}</p>
        <section>
          <h2>Ingtredients</h2>
          <ol>
            {reducerRecipeDetail(foodDetail).map((value, index) => (
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
          <p data-testid="instructions">{foodDetail.strInstructions}</p>
        </section>
        <section>
          <div>
            <h2>Video</h2>
          </div>
          <iframe
            src={ foodDetail.strYoutube.replace('whatch?v=', 'embed/') }
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
        <StartButton
          dataTestId="start-recipe-button"
          buttonName={ isStartedRecipe ? 'Continue Recipe' : 'Start Recipe' }
          handleClick={ redirect }
        />
      </main>
    </>
  );
};

export default FoodDetail;
