let pokemonRepository = (function() {
  let pokemonList = [];
  pokemonList = [{
      name: "Pikachu",
      type: "electric",
      height: 0.4
    },
    {
      name: "Charizard",
      type: ["fire", "flying"],
      height: 1.7
    },
    {
      name: "Pidgeot",
      type: ["flying", "normal"],
      height: 1.5
    },
    {
      name: "Nidoking",
      type: ["ground", "poison"],
      height: 1.4
    }
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    getAll: getAll,
    add: add
  };
})();


document.write("<h1>Pokemon List</h1>");
document.write("<ul>")

pokemonRepository.getAll().forEach(function(pokemon) {

const pokemonData = pokemon.name + ", type: "+ pokemon.type +  ", height: " + pokemon.height;
let displayValue;

if (pokemon.height > 1.5) {
  displayValue = "Woow, that's big - " + pokemonData;
} else {
  displayValue = pokemonData;
}
document.write("<li>" + displayValue +"</li>");
});

document.write("</ul>")
