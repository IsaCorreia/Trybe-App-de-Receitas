import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import useFormValidatior from '../hooks/useFieldValidator';
import useSaveToLocalStorage from '../hooks/useSaveToLocalStorage.js';

const Login = () => {
  const { user,
    setUser,
    isButtonDisabled,
    user: { email, password } } = useContext(AppContext);

  useFormValidatior();

  useSaveToLocalStorage([
    ['mealsToken', 1],
    ['cocktailsToken', 1],
    ['email', email],
  ]);

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
      <Link to="/foods">
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ isButtonDisabled }
        >
          Enter

        </button>
      </Link>
    </form>
  );
};

export default Login;
