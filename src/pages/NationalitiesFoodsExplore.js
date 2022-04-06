import React, { useContext, useState } from 'react';
import ExploreRecipeCard from '../components/ExploreRecipeCards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { MEALS_ENDPOINT } from '../helpers/enpoints';
import useRecipesInitialRequest from '../hooks/useRecipeInitialRequest';

const NationalitiesFoodsExplore = () => {
  const NUMBER_OF_CARDS = 12;
  const { foodRequest, setFoodRequest } = useContext(RecipesContext);
  const [nationalityFilter, setNationalityFilter] = useState('All');
  useRecipesInitialRequest(MEALS_ENDPOINT, setFoodRequest, 'foods');

  const filteredRequest = nationalityFilter === 'All' ? foodRequest
    .slice(0, NUMBER_OF_CARDS) : foodRequest
    .slice(0, NUMBER_OF_CARDS)
    .filter(({ strArea }) => (strArea === nationalityFilter));

  return (
    <>
      <Header currentPage="Explore Nationalities" disableSearch={ false } />
      <h1>NationalitiesFoodsExplore!</h1>
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ ({ target }) => setNationalityFilter(target.value) }
      >
        <option data-testid="All-option">All</option>
        {foodRequest.map(({ strArea }, index) => (
          <option data-testid={ `${strArea}-option` } key={ index }>
            {strArea}
          </option>
        ))}
      </select>
      <div className="card-display">
        {foodRequest?.length > 0
          && filteredRequest
            .map((card, index) => (
              <ExploreRecipeCard
                linkTo={ `/foods/${card.idMeal}` }
                key={ index }
                index={ index }
                testidContainer={ `${index}-recipe-card` }
                testidImg={ `${index}-card-img` }
                testidName={ `${index}-card-name` }
                src={ card.strMealThumb }
                recipeName={ card.strMeal }
              />
            ))}
      </div>
      <Footer />
    </>
  );
};

export default NationalitiesFoodsExplore;
