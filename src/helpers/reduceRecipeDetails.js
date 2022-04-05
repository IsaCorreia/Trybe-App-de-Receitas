const reducerRecipeDetail = (details) => Object.entries(details)
  .reduce((acc, entries, index, arr) => {
    // vetor na posição 0 === 'strIngredient' e vetor na posição 1 verdadeiro?
    if (entries[0].includes('strIngredient') && entries[1]) {
      // acumula o valor iterado e passa para o próximo
      return [[...acc[0], entries[1]], [...acc[1]]];
    }
    if (entries[0].includes('strMeasure') && entries[1]) {
      return [[...acc[0]], [...acc[1], entries[1]]];
    }
    // Ao verificar todo o array, retorna os valores excluíndo o que for undefined
    if (arr.length - 1 === index) {
      return acc[0]
        .map((item, mapIndex) => `${item} - ${acc[1][mapIndex]}`.trim())
        .filter((value) => !value.includes('undefined'));
    }
    return acc;
  },
  [[], []]);

export default reducerRecipeDetail;
