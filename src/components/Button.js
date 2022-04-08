import React from 'react';
import PropTypes from 'prop-types';

export default function Button({
  handleClick,
  isDisable,
  dataTestId,
  children,
  buttonName,
  name,
  type,
  src,
}) {
  return (
    <button
      name={ name }
      type={ type === 'button' ? 'button' : 'submit' }
      onClick={ ({ target }) => handleClick(target) }
      disabled={ isDisable }
      data-testid={ dataTestId }
      src={ src || null }
    >
      { children || buttonName }
    </button>
  );
}

Button.defaultProps = {
  isDisable: false,
  type: 'button',
  src: null,
  children: null,
  buttonName: '',
  name: '',
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  name: PropTypes.string,
  isDisable: PropTypes.bool,
  dataTestId: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  buttonName: PropTypes.string,
  type: PropTypes.string,
  src: PropTypes.string,
};
