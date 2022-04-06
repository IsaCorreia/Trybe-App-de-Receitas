import React, { useContext, useEffect, useState } from 'react';
import ExploreRecipeCard from '../components/ExploreRecipeCards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import {
  AREAS_ENDPOINT,
  FILTER_BY_AREA_ENDPOINT,
  MEALS_ENDPOINT,
} from '../helpers/enpoints';
import useRecipesInitialRequest from '../hooks/useRecipeInitialRequest';

const NationalitiesFoodsExplore = () => {
  const NUMBER_OF_CARDS = 12;
  const { foodRequest, setFoodRequest } = useContext(RecipesContext);
  const [nationalityFilter, setNationalityFilter] = useState('All');
  const [areaRequest, setAreaRequest] = useState([]);
  const [originalRequest, setOriginalRequest] = useState([]);

  useRecipesInitialRequest(AREAS_ENDPOINT, setAreaRequest, 'strArea');
  useRecipesInitialRequest(MEALS_ENDPOINT, setFoodRequest, 'meals');
  useRecipesInitialRequest(MEALS_ENDPOINT, setOriginalRequest, 'meals');

  useEffect(() => {
    const fetchNewFoods = async () => {
      const newFoods = await fetch(FILTER_BY_AREA_ENDPOINT(nationalityFilter))
        .then((response) => response.json())
        .catch((e) => console.log(e));
      setFoodRequest(newFoods.meals);
    };
    if (nationalityFilter !== 'All') {
      fetchNewFoods();
    } else {
      setFoodRequest(originalRequest);
    }
  }, [nationalityFilter, setFoodRequest, originalRequest]);

  return (
    <>
      <Header currentPage="Explore Nationalities" disableSearch={ false } />
      <h1>NationalitiesFoodsExplore!</h1>
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ ({ target }) => setNationalityFilter(target.value) }
      >
        <option data-testid="All-option">All</option>
        {areaRequest.map(({ strArea }, index) => (
          <option data-testid={ `${strArea}-option` } key={ index }>
            {strArea}
          </option>
        ))}
      </select>
      <div className="card-display">
        {foodRequest?.length > 0
          && foodRequest
            .slice(0, NUMBER_OF_CARDS)
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
