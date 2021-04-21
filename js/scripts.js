let pokemonList = [];
pokemonList= [{name: "Pikachu", type: "electric", height: 0.4},
{name: "Charizard", type:["fire", "flying"], height: 1.7},
{name: "Pidgeot", type:["flying", "normal"], height: 1.5},
{name: "Nidoking", type:["ground", "poison"], height: 1.4}];

// let text="";
// for (let i=0; i < pokemonList.length; i++) {
//   text= text+ " "+pokemonList[i].name+" (height: "+pokemonList[i].height+") "
//   document.write(text);
//   i++;
// };

document.write("<h1>Pokemon List</h1>")
document.write("<ul>")

let text="";
let i=0;
for (;i < pokemonList.length;) {
  document.write("<li>"+pokemonList[i].name + " (height:" + pokemonList[i].height + ") ");
  if (pokemonList[i].height > 1.5) {
    document.write(' - Wow, that\'s big!')
  }
  i++;;
}

document.write("</ul>")
