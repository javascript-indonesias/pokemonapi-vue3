const getListPokemon = () => {
  const reqPromise = fetch('https://pokeapi.co/api/v2/pokemon?limit=200&offset=0');
  return reqPromise;
};

export default getListPokemon;
