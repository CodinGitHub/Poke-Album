import {CardPokemon} from './objects.js'

// Configuración inicial
let totalOfPokemons = 150;
let allPokemons = [];

app();

async function pokemonRequest(id){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    let pokemon = await response.json();
    return pokemon
}

async function app(){
    

    if(localStorage.getItem('allPokemons') == null){
        for(let i=1; i<=totalOfPokemons; i++){
       
            // Hacer la consulta al API de pokemon
            let pokemon = await pokemonRequest(i);
            console.log('esto no hace')
            //Armar el arreglo de objetos con los datos
            let id = pokemon.id;
            let name = pokemon.name; 
            let img = pokemon.sprites.other['official-artwork'].front_default;
            let hp = pokemon.stats[0].base_stat;
            let attack = pokemon.stats[1].base_stat; 
            let defense = pokemon.stats[2].base_stat; 
            let speed = pokemon.stats[5].base_stat;

            let newPokemon = new CardPokemon(id, name, img, hp, attack, defense, speed, 'inactive');

            allPokemons.push(newPokemon)
            // pokemonSelected[i] = 'disable';
            
            //Pintar el Cargando
            loaderContainer.innerHTML = 
            `   <p>Cargando...</p>
                <progress min="0" max="${totalOfPokemons}" value="${allPokemons.length}"></progress>`;
        }
        // Guardar arreglo de objetos en local
    saveData(allPokemons);
        
    }else{
        // pokemonSelected = JSON.parse(localStorage.getItem('pokemonSelected'))
        allPokemons = JSON.parse(localStorage.getItem('allPokemons'));
        console.log(allPokemons)
        console.log('cargo desde local');
       
        
    }

    
    
    // console.log(allPokemons);
    
    //Dibujar las tarjetas de la primera pagina
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
            console.log(allPokemons[i])
            createFromArray(i);
        }
        
    }
    updatePages(page);
    updateActive();

    function createFromArray(id){
        cardCreator(
            allPokemons[id].id, 
            allPokemons[id].name, 
            allPokemons[id].img, 
            allPokemons[id].hp, 
            allPokemons[id].attack, 
            allPokemons[id].defense, 
            allPokemons[id].speed,
            allPokemons[id].status);
    }

    function cardCreator(id, pokeName, pokeImg, hp, attack, defense, speed, status){
        cards.innerHTML += `
        <div class="${status} card-container" id="${id}">
            <p class="click-area"></p>
            <p class="number">${id}</p>
            <h2 class="name">${pokeName}</h2>
            
            <div class="circle"></div>
            <img src="${pokeImg}" alt="">
            <div class="stats-container">
                <section class="section1">
                    <img src="./images/stats/hp.png" class="stat-logo">
                    <img src="./images/stats/attack.png" class="stat-logo">
                    <img src="./images/stats/defense.png" class="stat-logo">
                    <img src="./images/stats/speed.png" class="stat-logo">
                </section>
                <section class="section2">
                    <progress min="0" max="250" value="${hp}"></progress>
                    <progress min="0" max="134" value="${attack}"></progress>
                    <progress min="0" max="130" value="${defense}"></progress>
                    <progress min="0" max="150" value="${speed}"></progress>
                </section>
                <section class="section3">
                    <p class="stat">${hp}</p>
                    <p class="stat">${attack}</p>
                    <p class="stat">${defense}</p>
                    <p class="stat">${speed}</p>
                </section>
            </div>
            
        </div>
        `;
    }

    //  for(let i=1; i<=totalOfPokemons; i++){
    //         updateCurrentState(i);
    //     }
    //Escuchando seleccion de cartas
    let cardSelected = cards.addEventListener('click', (event)=>{
        let idCardSelected = event.srcElement.parentNode.id;   
        console.log(idCardSelected);
        // console.log(allPokemons[1]);

        updateCurrentState(idCardSelected);
        
        if(allPokemons[idCardSelected-1].status == 'active'){
            allPokemons[idCardSelected-1].status = 'inactive';
        }else{
            allPokemons[idCardSelected-1].status = 'active';
        }
        
        // Actualizar estado pokemon
        
        saveData(allPokemons);
        updateActive();
    });

    function updateCurrentState(id){
        let currentCard = document.getElementById(`${id}`);

        if(allPokemons[id-1].status == 'active'){
            currentCard.classList.remove('active');
            currentCard.classList.add('inactive')
        }else{
            currentCard.classList.remove('inactive');
            currentCard.classList.add('active')
        }

        saveData(allPokemons);
        updateActive();
    }

    // Escuchar Aplastado de Botones

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

        let pokemonSelected = []

        allPokemons.forEach(element => {
            pokemonSelected.push(element.status);
        });


        let numberOfSelected = pokemonSelected.filter(element=>element == 'active');
        total.innerHTML = `${numberOfSelected.length}/${totalOfPokemons}`

        // localStorage.setItem('pokemonSelected', JSON.stringify(pokemonSelected))
        localStorage.setItem('allPokemons', JSON.stringify(allPokemons))
        
    }
    function saveData(data){
        localStorage.setItem('allPokemons', JSON.stringify(data))
    }
}