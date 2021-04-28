let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

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
      showModal(pokemon);
      console.log(pokemon);
    });
  }

  function showModal(pokemon) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerHTML = 'X';
    closeButtonElement.addEventListener('click', hideModal());

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    let pokemonPropertiesDiv = document.createElement('div');
    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;

    let contentElement = document.createElement('p');
    contentElement.innerText = pokemon.detailsUrl;

    let contentElement2 = document.createElement('p');
    contentElement2.innerText = 'height: ' + pokemon.height;

    modalContainer.appendChild(modal);

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(pokemonPropertiesDiv);

    pokemonPropertiesDiv.appendChild(imageElement);
    pokemonPropertiesDiv.appendChild(contentElement);
    pokemonPropertiesDiv.appendChild(contentElement2);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

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
