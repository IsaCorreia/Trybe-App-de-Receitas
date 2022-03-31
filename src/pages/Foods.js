import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { MEALS_ENDPOINT } from '../helpers/enpoints';
import useFoodInitialRequest from '../hooks/useFoodInitialRequest';

const Foods = () => {
  const { setFoodInitialRequest } = useContext(RecipesContext);
  useFoodInitialRequest(MEALS_ENDPOINT, setFoodInitialRequest, 'foods');
  return (
    <>
      <Header currentPage="Foods" />
      <h1>Foods!</h1>
      <Footer />
    </>
  );
};

export default Foods;
