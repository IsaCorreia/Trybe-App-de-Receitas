const updateLocalStorage = (key, value) => {
  const oldStorage = JSON.parse(localStorage.getItem(key));
  if (oldStorage) {
    const newStorage = [...oldStorage, value];
    localStorage.setItem(key, JSON.stringify(newStorage));
  } else {
    localStorage.setItem(key, JSON.stringify([value]));
  }
};

const newStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const loadStorage = (key) => JSON.parse(localStorage.getItem(key));

const filterItemById = (key, id) => {
  const oldList = JSON.parse(localStorage.getItem(key)) || [];
  const newList = oldList.filter((recipe) => recipe.id !== id);
  localStorage.setItem(key, JSON.stringify(newList));
};

export { updateLocalStorage, newStorage, filterItemById, loadStorage };
