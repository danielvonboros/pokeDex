let pokemonRepository = (function () {
  let pokemonList = [];
  pokemonList = [{
      name: 'Pikachu',
      type: 'electric',
      height: 0.4,
    },
    {
      name: 'Charizard',
      type: ['fire', 'flying'],
      height: 1.7,
    },
    {
      name: 'Pidgeot',
      type: ['flying', 'normal'],
      height: 1.5,
    },
    {
      name: 'Nidoking',
      type: ['ground', 'poison'],
      height: 1.4,
    },
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function addListItem(pokemon) {
    let pokedexList = document.querySelector('.pokemon-list');
    let newListItem = document.createElement('li');
    let newListButton = document.createElement('button');
    newListButton.innerText = pokemon.name;
    newListButton.classList.add('pokedex-button');
    newListItem.appendChild(newListButton);
    pokedexList.appendChild(newListItem);
    newListButton.addEventListener('click', function foo() {console.log(pokemon);});
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
