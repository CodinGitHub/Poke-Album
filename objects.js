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
}


let todosLosPokemones = []

let machamp = new CardPokemon('id', 'name', 'img', 'hp', 'attack', 'defense', 'speed' );
let newtwo = new CardPokemon('id2', 'name2', 'img2', 'hp2', 'attack2', 'defense2', 'speed2' );

todosLosPokemones.push(machamp);
todosLosPokemones.push(newtwo);

console.log(todosLosPokemones);