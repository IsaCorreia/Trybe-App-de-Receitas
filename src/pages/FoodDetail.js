import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useRecipeInitialRequest from '../hooks/useRecipeInitialRequest';
import RecipeContext from '../context/RecipesContext';
import reducerRecipeDetail from '../helpers/reduceRecipeDetails';

const FoodDetail = ({
  match: {
    params: { id },
  },
}) => {
  const FOOD_DETAILS_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  const { foodDetail, setFoodDetail } = useContext(RecipeContext);

  useRecipeInitialRequest(FOOD_DETAILS_URL, setFoodDetail, 'meals');

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
        <h1 data-testid="recipe-title">{ strMeal }</h1>
        <h3 data-testid="recipe-category">{ strCategory }</h3>
      </div>
      <section>
        <h2>Ingtredients</h2>
        <ol>
          {reducerRecipeDetail(foodDetail[0]).map((value, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { value }
            </li>
          ))}
        </ol>
      </section>
      <section>
        <div data-testid="instructions">
          {strInstructions}
        </div>
      </section>
      <section data-testid="video">
        {strYoutube}
      </section>
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
