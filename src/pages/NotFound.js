import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';

const NotFound = () => (
  <>
    <Header currentPage="Not Found" />
    <h1>NotFound!</h1>
    <Link to="/foods">Home</Link>
  </>
);

export default NotFound;
