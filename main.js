// Consultar un N número de pokemons
let totalOfPokemons = 5;
let allPokemones = []

// Hacer la consulta al API de pokemon
async function getApiResponse(id){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();
    objCreator(data, id);
}
// Armar un objeto con los datos del API
for(let i=1; i<=totalOfPokemons; i++){
    let pokemon = getApiResponse(i);
    allPokemones.push(pokemon);
    // console.log(allPokemones)
}
class CardPokemon{
    constructor(id, name, img, hp, attack, defense, speed ){
        this._id = id;
        this._name = name;
        this._img = img;
        this._hp = hp;
        this._attack = attack;
        this._defense = defense;
        this._speed = speed;
    }
    get id(){
        return this._id;
    }
    get name(){
        return this._name;
    }
    get img(){
        return this._img;
    }
    get hp(){
        return this._hp;
    }
    get attack(){
        return this._attack;
    }
    get defense(){
        return this._defense;
    }
    get speed(){
        return this._speed;
    }
    
}
function objCreator(data, id){

    let pokeName = data.name;
    let pokeImg = data.sprites.other['official-artwork'].front_default;
    let hp = data.stats[0].base_stat;
    let attack = data.stats[1].base_stat;
    let defense = data.stats[2].base_stat;
    let speed = data.stats[5].base_stat;

    let pokemonfromClass = new CardPokemon(id, pokeName, pokeImg, hp, attack, defense, speed );
    allPokemones.push(pokemonfromClass)

    cardCreator(id, pokeName, pokeImg, hp, attack, defense, speed);
    console.log(allPokemones)
    return allPokemones;
}

//Objeto con 150 pokemones

let pokemonSelected = [];
for(i=1; i<=totalOfPokemons; i++){
    pokemonSelected[i] = 'disable';
}
// console.log(pokemonSelected);

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
    
    for(let i = start; i<end; i++){
        let pokemonfromClass = getApiResponse(i);
        // console.log(pokemonfromClass.then())
        // allPokemones.push(pokemonfromClass);
        // createFromObject();
    }
    // console.log(allPokemones)
}
let objeto = {
    _id: 'uno',
    _lh: 3
}
let prueba = [objeto, objeto, objeto]

// console.log(prueba)

// console.log(allPokemones['CardPokemon'])

updatePages(page);
updateActive();
/*
function searchByID(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json())
    .then(data => {
        let pokeName = data.name;
        let pokeImg = data.sprites.other['official-artwork'].front_default;
        cardCreator(id, pokeName, pokeImg)
    })
}
*/

function createFromObject(id){
    cardCreator(allPokemones[id]._id, allPokemones[id]._name, allPokemones[id]._img, allPokemones[id]._hp, allPokemones[id]._attack, allPokemones[id]._defense, allPokemones[id]._speed);
}
// cardCreator(id, pokeName, pokeImg, hp, attack, defense, speed);

function cardCreator(id, pokeName, pokeImg, hp, attack, defense, speed){
    cards.innerHTML += `
    <div class="${pokemonSelected[id]} card-container" id="${id}">
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
    console.log(event)
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

function objectValuesCounter(value, object, objectLength){
    counter = 0;
    
    for(i=1; i<=objectLength; i++){
        if(object[i] === value){      
            counter++
        }
    }
    console.log(counter);
}

// objectValuesCounter('active', objectPrueba, 4);