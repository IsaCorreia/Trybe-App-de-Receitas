import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import useFormValidatior from '../hooks/useFieldValidator';

const Login = ({ history }) => {
  const { user,
    setUser,
    isButtonDisabled,
    user: { email, password } } = useContext(AppContext);

  useFormValidatior();

  const dataToBeStored = [
    ['mealsToken', 1],
    ['cocktailsToken', 1],
    ['user', JSON.stringify({ email })],
  ];

  const saveToLocalStorage = (data) => {
    data.forEach((dataElement) => localStorage
      .setItem(dataElement[0], dataElement[1]));
    history.push('/foods');
  };

  const handleInput = ({ target: { name, value } }) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <form className="login-form">
      <label htmlFor="email">
        <input
          placeholder="e-mail"
          name="email"
          data-testid="email-input"
          type="email"
          value={ email }
          onChange={ handleInput }
        />
      </label>
      <label htmlFor="password">
        <input
          placeholder="password"
          data-testid="password-input"
          type="password"
          name="password"
          value={ password }
          onChange={ handleInput }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ isButtonDisabled }
        onClick={ () => saveToLocalStorage(dataToBeStored) }
      >
        Enter

      </button>
    </form>
  );
};

Login.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default Login;
