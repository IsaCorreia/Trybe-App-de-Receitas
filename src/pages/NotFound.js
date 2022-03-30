import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const NotFound = () => (
  <>
    <h1>NotFound!</h1>
    <Link to="/foods">Home</Link>
  </>
);

export default NotFound;
