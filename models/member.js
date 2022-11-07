const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _name: String,
    _lastName: String,
    _address: String,
    _phone: String,
});

class Member {
    constructor(name, lastName, address, phone){
        this._name = name;
        this._lastName = lastName;
        this._address = address;
        this._phone = phone;
    }

    get name(){
        return this._name;
    }

    set name(name){
        this._name = name;
    }

    get lastName(){
        return this._lastName;
    }

    set lastName(lastName){
        this._lastName = lastName;
    }

    get address(){
        return this._address;
    }

    set address(address){
        this._address = address;
    }

    get phone(){
        return this._phone;
    }

    set phone(phone){
        this._phone = phone;
    }
}

schema.loadClass(Member);
module.exports = mongoose.model('Member', schema);