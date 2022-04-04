import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Profile = ({ history }) => {
  const getLocalStorageEmail = () => {
    const getUser = JSON.parse(localStorage.getItem('user'));
    return getUser.email;
  };

  const redirectLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header currentPage="Profile" />
      <h1>Profile!</h1>
      <div
        style={ { display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          alignItems: 'center' } }
      >
        <span
          data-testid="profile-email"
        >
          { getLocalStorageEmail() }

        </span>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes

        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ redirectLogout }
        >
          Logout
        </button>
        <Footer />
      </div>
    </>
  );
};

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
