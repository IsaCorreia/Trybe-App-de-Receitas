import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import useRecipeInitialRequest from '../hooks/useRecipeInitialRequest';

const IngredientsDrinksExplore = () => {
  const { ingredientsRequest, setIngredientsRequest } = useContext(RecipesContext);
  const INGREDIENTS_ENDPOINT = 'www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  // const IMG_ENDPOINT_START = 'www.thecocktaildb.com/images/ingredients/';
  // const NUMBER_OF_CARDS = 12;
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
      <h1>IngredientsDrinksExplore!</h1>
      <div className="card-display">
        {/* {ingredientsRequest
          && ingredientsRequest
            .slice(0, NUMBER_OF_CARDS)
            .map(({ strIngredient1 }, index) => (
              <IngredientCard
                key={ index }
                index={ index }
                ingredientName={ strIngredient1 }
                ingredientImage={ `${IMG_ENDPOINT_START}${strIngredient1}-Small.png` }
              />
            ))} */}
      </div>
      <Footer />
    </div>
  );
};

export default IngredientsDrinksExplore;
