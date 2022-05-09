// Pokemon: https://pokeapi.co/api/v2/pokemon/{id or name}/
// Tipo: https://pokeapi.co/api/v2/type/{id or name}/

async function getPokemon(id){
    
    let tipos = []

    for(i=1; i<=150; i++){
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        let pokemon = await response.json();
        // console.log(pokemon.name);
        console.log(pokemon.types[0].type.name);
        tipos.push(pokemon.types[0].type.name)
    }

    console.log(tipos)

    let tiposUnicos = [...new Set(tipos)]

    console.log(tiposUnicos)
    
    


    // console.log(pokemon.name);
    // console.log(pokemon.types.length);
    // console.log(pokemon.types[0].type.name);
    // console.log(pokemon.types[1].type.name);
}

getPokemon();