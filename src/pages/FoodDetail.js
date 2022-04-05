import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useRecipeInitialRequest from '../hooks/useRecipeInitialRequest';
import RecipeContext from '../context/RecipesContext';

const FoodDetail = ({
  match: {
    params: { id },
  },
}) => {
  const DETAILS_END_POINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  const { foodDetail, setFoodDetail } = useContext(RecipeContext);

  useRecipeInitialRequest(DETAILS_END_POINT, setFoodDetail, 'meals');

  console.log(foodDetail);

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
  // criar um array com os elementos da receita filatrando
  // cada elemento por valor

  return (
    <main>
      <div>
        <img src={ strMealThumb } alt={ strMeal } />
        <h1>{ strMeal }</h1>
        <h3>{ strCategory }</h3>
      </div>
      <section>
        <h2>Ingtredients</h2>

        <ol>
          <li>igrediente 1</li>
          <li>igrediente 2</li>
          <li>igrediente 3</li>
        </ol>
      </section>
      <section>
        <div>
          { strInstructions }
        </div>
      </section>
      <section>
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
