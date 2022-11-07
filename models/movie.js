const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _title: String,
    _genre: {
        type: mongoose.Schema.ObjectId,
        ref: 'Genre'
    },
    _director: {
        type: mongoose.Schema.ObjectId,
        ref: 'Director'
    }
});

class Movie {
    constructor(title, genre, director){
        this._title = title;
        this._genre = genre;
        this._director = director;
    }

    get title(){
        return this._title;
    }

    set title(title){
        this._title = title;
    }

    get genre(){
        return this._genre;
    }

    set genre(genre){
        this._genre = genre;
    }

    get director(){
        return this._director;
    }

    set director(director){
        this._director = director;
    }
}

schema.loadClass(Movie);
module.exports = mongoose.model('Movie', schema);