let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=898';

  // I limited the number of pokemon to 898, because number 898 would be the last "regular"
  //pokemon named "calyrex". numbers starting from 10001 seem to be variations of pokemon
  //already in the list..

  //Time to load the page quite high (probably because of the 898 objects)
  //To improve loading performance, maybe limit the number of pokemon to 150.

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
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('Pokemon-Data is not correct, Pokemon could not be added.');
    }
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
    newListButton.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  };

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
