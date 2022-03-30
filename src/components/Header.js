import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <>
    <h1>Header!</h1>
    <span>Search</span>
    <span>Title</span>
    <Link to="/profile">Profile</Link>
    <span>Filters</span>
  </>
);

export default Header;
