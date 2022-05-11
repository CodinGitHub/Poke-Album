/*
export class CardPokemon{
    constructor(id, name, img, hp, attack, defense, speed, status){
        this._id = id;
        this._name = name;
        this._img = img;
        this._hp = hp;
        this._attack = attack;
        this._defense = defense;
        this._speed = speed;
        this._status = status
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
    get status(){
        return this._status;
    }
    set status(newState){
        this._status = newState;
    }
}
*/

export class CardPokemon{
    constructor(id, name, img, hp, attack, defense, speed, status){
        this.id = id;
        this.name = name;
        this.img = img;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.status = status
    }
}