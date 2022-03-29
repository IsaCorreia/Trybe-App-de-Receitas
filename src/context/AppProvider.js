import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [loginValues, setLoginValues] = useState({
    email: '',
    password: '',
    isButtonDisabled: true,
  });

  const contextValue = {
    loginValues,
    setLoginValues,
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
