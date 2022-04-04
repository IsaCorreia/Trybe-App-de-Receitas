import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const FoodsExplore = () => {
  // Fazer requisição de meal aleatória
  // Endpoint: https://www.themealdb.com/api/json/v1/1/random.php
  const randomRecipeId = '1';
  return (
    <>
      <Header currentPage="Explore Foods" disableSearch />
      <div
        style={ {
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
        } }
      >
        <h1>FoodsExplore!</h1>
        <Link to="/explore/foods/ingredients">
          <button type="button" data-testid="explore-by-ingredient">
            By Ingredient
          </button>
        </Link>
        <Link to="/explore/foods/nationalities">
          <button type="button" data-testid="explore-by-nationality">
            By Nationality
          </button>
        </Link>
        <Link to={ `/foods/${randomRecipeId}` }>
          <button type="button" data-testid="explore-surprise">
            Surprise me!
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default FoodsExplore;
