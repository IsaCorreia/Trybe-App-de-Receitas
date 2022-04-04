import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipesContext from '../context/RecipesContext';
import { DRINKS_ENDPOINT } from '../helpers/enpoints';
import useRecipeInitialRequest from '../hooks/useRecipeInitialRequest';

const Drinks = () => {
  const { setDrinksInitialRequest } = useContext(RecipesContext);
  useRecipeInitialRequest(DRINKS_ENDPOINT, setDrinksInitialRequest, 'drinks');
  return (
    <>
      <Header currentPage="Drinks" disableSearch={ false } />
      <SearchBar />
      <h1>Drinks!</h1>
      <Footer />
    </>
  );
};

export default Drinks;
