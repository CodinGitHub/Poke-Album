export class CardPokemon{
    constructor(id, name, img, hp, attack, defense, speed, active){
        this._id = id;
        this._name = name;
        this._img = img;
        this._hp = hp;
        this._attack = attack;
        this._defense = defense;
        this._speed = speed;
        this._active = active
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
    get active(){
        return this._active;
    }
    set active(newState){
        this._active = newState;
    }
}