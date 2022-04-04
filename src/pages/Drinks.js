import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

const Drinks = () => (
  <>
    <Header currentPage="Drinks" />
    <SearchBar />
    <h1>Drinks!</h1>
    <Footer />
  </>
);

export default Drinks;
