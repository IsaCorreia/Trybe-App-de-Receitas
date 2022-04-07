import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard({ filterByType }) {
  // const [doneRecipesFromlocalStorage, setDoneRecipesFromLocalStorage] = useState([]);
  const [shareStatus, setShareStatus] = useState(false);
  const arrayDeTeste = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: ['Vodka'],
    },
  ];

  // const comidasFeitas = arrayDeTeste.filter((receita) => receita.type === 'food');
  // console.log(comidasFeitas);

  // useEffect(() => {
  //   const getDoneRecipesDoLocalStorage = localStorage.getItem('doneRecipes');
  //   if (getDoneRecipesDoLocalStorage) {
  //     setDoneRecipesFromLocalStorage(JSON.parse(getDoneRecipesDoLocalStorage));
  //   }
  // }, [setDoneRecipesFromLocalStorage]);

  // obs: TROCAR O ARRAY DE TESTE PELO OBJETO VINDO DO LOCAL STORAGE
  return (
    <div>
      {arrayDeTeste.length > 0
      && arrayDeTeste
        .filter(({ type }) => type.includes(filterByType))
        .map((receita, index) => (
          <div key={ index } className="card-recipe">
            <Link to={ `/${receita.type}s/${receita.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ receita.image }
                alt={ receita.name }
                style={ { width: '100px' } }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {receita.type === 'food'
                ? `${receita.nationality} - ${receita.category}` : receita.alcoholicOrNot}
            </p>
            <Link to={ `/${receita.type}s/${receita.id}` }>
              <p data-testid={ `${index}-horizontal-name` }>{receita.name}</p>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>{receita.doneDate}</p>
            <p>{console.log(arrayDeTeste)}</p>
            <button
              src={ shareIcon }
              alt="imagem do ícone"
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => {
                navigator.clipboard.writeText(`http://localhost:3000/${receita.type}s/${receita.id}`);
                setShareStatus(true);
              } }
            >
              <img src={ shareIcon } alt="imagem do ícone" />
            </button>
            {shareStatus && <p>Link copied!</p>}
            {receita.tags && receita.tags.map((tag) => (
              <p
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ tag }
              >
                {console.log(tag)}
                {tag}
              </p>
            )) }
          </div>
        ))}
    </div>
  );
}
DoneRecipeCard.propTypes = {
  filterByType: PropTypes.string.isRequired,
};
export default DoneRecipeCard;
