import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useRecipeInitialRequest from '../hooks/useRecipeInitialRequest';
import RecipeContext from '../context/RecipesContext';
import reducerRecipeDetail from '../helpers/reduceRecipeDetails';
import Card from '../components/Card';

const FoodDetail = ({
  match: {
    params: { id },
  },
}) => {
  const FOOD_DETAILS_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const DRINKS_RECOMMENDATIONS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const MAX_RECOMMENDATIONS = 6;
  const { foodDetail, setFoodDetail } = useContext(RecipeContext);
  const { recommendations, setRecommendations } = useContext(RecipeContext);

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
  } = foodDetail[0];

  return (
    <main>
      <div>
        <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <h3 data-testid="recipe-category">{strCategory}</h3>
      </div>
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
        <div data-testid="instructions">
          <h2>Instructions</h2>
          {strInstructions}
        </div>
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
      {/* TODO: <StatrButton /> */}
    </main>
  );
};

FoodDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default FoodDetail;
