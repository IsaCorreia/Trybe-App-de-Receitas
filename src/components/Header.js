import propTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = ({ currentPage, disableSearch }) => {
  const [disableSearchInput, setDisableSearchInput] = useState(true);

  return (
    <div
      style={ {
        textAlign: 'center',
        flexDirection: 'column',
      } }
    >
      <div
        style={ {
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#EA1D2C ',
        } }
      >
        {!disableSearch && (
          <button
            type="button"
            onClick={ () => setDisableSearchInput(!disableSearchInput) }
          >
            <img data-testid="search-top-btn" src={ searchIcon } alt="search" />
          </button>
        )}
        <span data-testid="page-title">{currentPage}</span>
        <Link to="/profile">
          <button type="button">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile"
            />
          </button>
        </Link>
      </div>

      { !disableSearchInput && <input type="text" data-testid="search-input" /> }

      {/* <button type="button">Filters</button>np */}
      <hr />
    </div>
  );
};

Header.propTypes = {
  currentPage: propTypes.string.isRequired,
  disableSearch: propTypes.bool.isRequired,
};

export default Header;
