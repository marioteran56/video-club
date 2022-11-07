const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _street: String,
    _number: String,
    _zip: Number,
    _state: String
});

class Address {
    constructor(street, number, zip, state){
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._state = state;
    }

    get street(){
        return this._street;
    }

    set street(street){
        this._street = street;
    }

    get number(){
        return this._number;
    }

    set number(number){
        this._number = number;
    }

    get zip(){
        return this._zip;
    }

    set zip(zip){
        this._zip = zip;
    }

    get state(){
        return this._state;
    }

    set state(state){
        this._state = state;
    }
}

schema.loadClass(Address);
module.exports = mongoose.model('Address', schema);