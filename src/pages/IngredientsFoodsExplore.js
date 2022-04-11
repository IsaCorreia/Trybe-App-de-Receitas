import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import RecipesContext from '../context/RecipesContext';
import useRecipeInitialRequest from '../hooks/useRecipeInitialRequest';

const IngredientsFoodsExplore = () => {
  const { ingredientsRequest, setIngredientsRequest } = useContext(RecipesContext);
  const INGREDIENTS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const IMG_ENDPOINT_START = 'https://www.themealdb.com/images/ingredients/';
  const NUMBER_OF_CARDS = 12;
  useRecipeInitialRequest(
    INGREDIENTS_ENDPOINT,
    setIngredientsRequest,
    'ingredient',
  );

  return (
    <div
      style={ {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
      } }
    >
      <Header currentPage="Explore Ingredients" disableSearch />
      <h1>IngredientsFoodsExplore!</h1>
      <div className="card-display">
        {ingredientsRequest
          && ingredientsRequest
            .slice(0, NUMBER_OF_CARDS)
            .map(({ strIngredient }, index) => (
              <IngredientCard
                key={ index }
                index={ index }
                ingredientName={ strIngredient }
                ingredientImage={ `${IMG_ENDPOINT_START}${strIngredient}-Small.png)` }
              />
            ))}
      </div>
      <Footer />
    </div>
  );
};

export default IngredientsFoodsExplore;
