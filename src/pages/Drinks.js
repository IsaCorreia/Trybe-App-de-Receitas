import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { DRINKS_ENDPOINT } from '../helpers/enpoints';
import useFoodInitialRequest from '../hooks/useFoodInitialRequest';

const Drinks = () => {
  const { setDrinksInitialRequest } = useContext(RecipesContext);
  useFoodInitialRequest(DRINKS_ENDPOINT, setDrinksInitialRequest, 'drinks');
  return (
    <>
      <Header currentPage="Drinks" />
      <h1>Drinks!</h1>
      <Footer />
    </>
  );
};

export default Drinks;
