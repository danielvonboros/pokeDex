let pokemonList = [];
pokemonList= [{name: "Pikachu", type: "electric", height: 0.4, weight: 6, catchRate: 0, genderRatioMale:0.5, eggGroups: ["field", "fairy"]}];
pokemonList.push({name: "Charizard", type:["fire", "flying"], height: 1.7, weight: 90.5, catchRate: 0, genderRatioMale: 0.875, eggGroups: ["monster", "dragon"]});
pokemonList.push({name: "Pidgeot", type:["flying", "normal"], height: 1.5, weight: 39.5, catchRate: 0, genderRatioMale: 0.5, eggGroups: "flying"});
pokemonList.push({name: "Nidoking", type:["ground", "poison"], height: 1.4, weight: 62, catchRate: 0, genderRatioMale: 1, eggGroups:["monster", "field"]});

document.write(pokemonList);
