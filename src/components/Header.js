import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = () => (
  <>
    <h1>Header!</h1>
    <button type="button">
      <img data-testid="search-top-btn" src={ searchIcon } alt="seach" />
    </button>
    <span data-testid="page-title">Title(dinâmico de acordo com a página)</span>
    <Link to="/profile">
      <button type="button">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profile" />
      </button>
    </Link>
    <button type="button">Filters</button>
    <hr />
  </>
);

export default Header;
