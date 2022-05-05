// Hacer la consulta al API de pokemon
let totalOfPokemons = 150;
let allPokemones = [];
var nuevoObjeto = 1;

async function objectCreator(id){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    let pokemon = await response.json();
    return pokemon
    
    
    // console.log(allPokemones)
    // constructordeObjetos(allPokemones);
}

async function pruebas(){
    for(let i=1; i<=totalOfPokemons; i++){
        allPokemones.push(await objectCreator(i));
    }

    for(let i=0; i<totalOfPokemons; i++){
        console.log(allPokemones[i].id);
    }
    // AQUI      
}

pruebas();




// array.then(resultado => {
//     console.log(resultado)
// });

// function constructordeObjetos(allPokemones){
//     return nuevoObjeto = allPokemones;
// }

// console.log(nuevoObjeto)