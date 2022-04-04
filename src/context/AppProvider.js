import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [radioValue, setRadioValue] = useState('');
  const [inputSearchBarValue, setInputSearchBarValue] = useState('');
  const [recipesAPI, setRecipesAPI] = useState([]);

  const contextValue = {
    user,
    setUser,
    isButtonDisabled,
    setIsButtonDisabled,
    radioValue,
    setRadioValue,
    inputSearchBarValue,
    setInputSearchBarValue,
    recipesAPI,
    setRecipesAPI,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
