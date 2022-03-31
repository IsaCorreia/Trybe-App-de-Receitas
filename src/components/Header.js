import propTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = ({ currentPage = 'Title' }) => (
  <>
    <button type="button">
      <img data-testid="search-top-btn" src={ searchIcon } alt="serach" />
    </button>
    <span data-testid="page-title">{currentPage}</span>
    <Link to="/profile">
      <button type="button">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profile" />
      </button>
    </Link>
    <button type="button">Filters</button>
    <hr />
  </>
);

Header.propTypes = {
  currentPage: propTypes.string.isRequired,
};

export default Header;
