// Hacer la consulta al API de pokemon
let totalOfPokemons = 3;
let allPokemones = [];
var nuevoObjeto = 1;

async function objectCreator(id){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    let pokemon = await response.json();
    allPokemones.push(pokemon);
    constructordeObjetos(allPokemones);
}

for(let i=1; i<=totalOfPokemons; i++){
    var array = objectCreator(i)
}

// array.then(resultado => {
//     console.log(resultado)
// });

function constructordeObjetos(allPokemones){
    return nuevoObjeto = allPokemones;
}

console.log(nuevoObjeto)