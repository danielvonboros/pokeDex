let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      /* eslint-disable no-console */
      console.log('Pokemon-Data is not correct, Pokemon could not be added.');
      /* eslint-enable no-console */
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokedexList = document.querySelector('.pokemon-list');
    let newListItem = document.createElement('li');
    newListItem.classList.add('group-list-item');
    let newListButton = document.createElement('button');
    newListButton.setAttribute = '"data-toggle="modal" data-target="#exampleModal"';
    newListButton.innerText = pokemon.name;
    newListButton.classList.add('btn', 'btn-secondary', 'pokedex-button');
    newListItem.appendChild(newListButton);
    pokedexList.appendChild(newListItem);
    newListButton.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

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

      });
    }).catch(function (e) {
      /* eslint-disable no-console */
      console.error(e);
      /* eslint-enable no-console */
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      /* eslint-disable no-console */
      console.error(e);
      /* eslint-enable no-console */
    });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');

      modalTitle.empty();
      modalBody.empty();

      //Title Element - Pokemon Name
      let nameElement = $('<h1>' + pokemon.name + '</h1>');

      //Image Elements - Pokemon Images
      let imageElementFront = $('<img class="modal-img" style="width:50%">');
      imageElementFront.attr('src', pokemon.imageUrl);

      //Properties Elements - Pokemon Data
      let heightElement = $('<p>' + 'height: ' + pokemon.height + '</p>');

      let typesElement = document.createElement('ul');
      typesElement.classList.add('list-group');
      let types = 'Type: ';
      pokemon.types.forEach(function (item) {
        types += '<li>' + item.type.name + '</li>';
      });

      typesElement.innerHTML = types;

      //Appendage
      modalTitle.append(nameElement);
      modalBody.append(imageElementFront);
      modalBody.append(heightElement);
      modalBody.append(typesElement);

      //Calling the modal Element
      $('#pokemonModal').modal('toggle');
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


// Search for pokemons

    //eslint-disable-next-line no-unused-vars
    function myFunction() {
      let input, filter, ul, li, a, i, txtValue;
      input = document.getElementById('searchBar');
      filter = input.value.toUpperCase();
      ul = document.getElementById('list-group');
      li = ul.getElementsByTagName('li');
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName('button')[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = '';
        } else {
          li[i].style.display = 'none';
        }
      }
    }
