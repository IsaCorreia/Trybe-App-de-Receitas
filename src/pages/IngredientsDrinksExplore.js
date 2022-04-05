import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientCard from '../components/IngredientCard';
import RecipesContext from '../context/RecipesContext';
import {
  DRINKS_IMG_ENDPOINT_START as IMG_ENDPOINT,
  DRINKS_INGREDIENTS_ENDPOINT,
} from '../helpers/enpoints';
import useRecipeInitialRequest from '../hooks/useRecipeInitialRequest';

const IngredientsDrinksExplore = () => {
  const { ingredientsRequest, setIngredientsRequest } = useContext(RecipesContext);
  const NUMBER_OF_CARDS = 12;
  useRecipeInitialRequest(
    DRINKS_INGREDIENTS_ENDPOINT,
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
        {ingredientsRequest
          && ingredientsRequest
            .slice(0, NUMBER_OF_CARDS)
            .map(({ strIngredient1 }, index) => (
              <IngredientCard
                key={ index }
                index={ index }
                ingredientName={ strIngredient1 }
                ingredientImage={ `${IMG_ENDPOINT}${strIngredient1}-Small.png` }
                type="drinks"
              />
            ))}
      </div>
      <Footer />
    </div>
  );
};

export default IngredientsDrinksExplore;
