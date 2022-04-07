import { useEffect } from 'react';

const useVerifyCheckbox = (setButton) => {
  useEffect(() => {
    const allInputs = document.getElementsByTagName('input');
    const arrFromInputs = Array.from(allInputs);
    const checkedInputs = arrFromInputs.filter((input) => input.checked);

    if (checkedInputs.length === arrFromInputs.length && checkedInputs.length > 0) {
      setButton(false);
    } else {
      setButton(true);
    }
  });
};

export default useVerifyCheckbox;
