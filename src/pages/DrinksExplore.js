import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const DrinksExplore = () => {
  // Fazer requisição de cocktail aleatória
  // Endpoint: https://www.thecocktaildb.com/api/json/v1/1/random.php
  const randomRecipeId = '1';
  return (
    <>
      <Header currentPage="Explore Drinks" disableSearch />
      <div
        style={ {
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
        } }
      >
        <h1>DrinksExplore!</h1>
        <Link to="/explore/drinks/ingredients">
          <button type="button" data-testid="explore-by-ingredient">
            By Ingredient
          </button>
        </Link>
        <Link to={ `/drinks/${randomRecipeId}` }>
          <button type="button" data-testid="explore-surprise">
            Surprise me!
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default DrinksExplore;
