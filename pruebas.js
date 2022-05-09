let totalOfPokemons = 150;
let allPokemons = [];

app();

async function pokemonRequest(id){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    let pokemon = await response.json();
    return pokemon
}

async function app(){
    for(let i=1; i<=totalOfPokemons; i++){
        allPokemons.push(await pokemonRequest(i));
    }
        
    let pokemonSelected = [];
    for(i=1; i<=totalOfPokemons; i++){
        pokemonSelected[i] = 'disable';
    }

    //Dibujar 10 elementos
    let page = 1;
    let ppp = 10;
    let maxpage = Math.ceil(totalOfPokemons/ppp);
    let minpage = 1;
    newPage(page);
    function newPage(page){
        cards.innerHTML = '';
        let start = 1 + ((page-1)*ppp);
        let end = start + ppp;
        
        if (end>totalOfPokemons){
            end = totalOfPokemons + 1;
        }
        
        for(let i = start-1; i<end-1; i++){
            createFromArray(i);
        }
    }
    updatePages(page);
    updateActive();

    function createFromArray(id){
        cardCreator(
            allPokemons[id].id, 
            allPokemons[id].name, 
            allPokemons[id].sprites.other['official-artwork'].front_default, 
            allPokemons[id].stats[0].base_stat, 
            allPokemons[id].stats[1].base_stat, 
            allPokemons[id].stats[2].base_stat, 
            allPokemons[id].stats[5].base_stat);
    }

    function cardCreator(id, pokeName, pokeImg, hp, attack, defense, speed){
        cards.innerHTML += `
        <div class="${pokemonSelected[id]} card-container" id="${id}">
            <p class="click-area"></p>
            <p class="number">${id}</p>
            <h2 class="name">${pokeName}</h2>
            
            <div class="circle"></div>
            <img src="${pokeImg}" alt="">
            <div class="types-container">
                <p>Fuego</p>
                <p>Grass</p>
            </div>
            
        </div>
        `;
    }

    //Escuchando seleccion de cartas
    let cardSelected = cards.addEventListener('click', (event)=>{
        let idCardSelected = event.srcElement.parentNode.id;   
        //Actualizar Matriz
        if(pokemonSelected[idCardSelected] === 'disable'){
            pokemonSelected[idCardSelected] = 'enable';
        }else{
            pokemonSelected[idCardSelected] = 'disable';
        }
        updateCurrentState(idCardSelected);
    });

    function updateCurrentState(id){
        let currentCard = document.getElementById(`${id}`);
        if(currentCard.classList.contains ('disable')){
            currentCard.classList.remove('disable');
        }else{
            currentCard.classList.add('disable')
        } 
        updateActive();
    }
    //Botones

    right.addEventListener('click', (event)=>{
        page++;
        if(page <= maxpage){
            newPage(page);
        }else{
            newPage(page = minpage);
        }
        updatePages(page)
    });
    left.addEventListener('click', ()=>{
        page--;
        if(page >= minpage){
            newPage(page);
        }else{
            newPage(page = maxpage);
        }
        updatePages(page);
    });

    function updatePages(page){
        let pages = document.getElementById('pages')
        pages.innerHTML = `${page}/${maxpage}`
    }
    function updateActive(){
        let total = document.getElementById('total');
        let numberOfSelected = pokemonSelected.filter(element=>element == 'enable');
        total.innerHTML = `${numberOfSelected.length}/${totalOfPokemons}`
    }
}