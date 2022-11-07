const express = require('express');
const Movie = require('../models/movie');
const Genre = require('../models/genre');
const Director = require('../models/director');

function list(req, res, next) {
    Movie.find().populate(["_genre", "_director"])
        .then(objs => res.status(200).json({
            message: "Lista de peliculas",
            obj: objs
        }))
        .catch(ex => res.status(500).json({
            message: "No se pudo consultar la lista de peliculas",
            obj: ex
        }));
}

function index(req, res, next) {
    const id = req.params.id;
    Movie.findOne({"_id": id})
        .then(obj => res.status(200).json({
            message: `Pelicula con id: ${id}`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: `No se pudo consultar la pelicula con id: ${id}`,
            obj: ex
        }));
}

async function create(req, res, next) {
    const title = req.body.title;
    const genreId = req.body.genreId;
    const directorId = req.body.directorId;

    let genre = await Genre.findOne({"_id": genreId});
    let director = await Director.findOne({"_id": directorId});

    let movie = new Movie({
        title: title,
        genre: genre,
        director: director
    });
    
    movie.save()
        .then(obj => res.status(200).json({
            message: "Pelicula creada correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: "No se pudo guardar la pelicula",
            obj: ex
        }));
}

async function replace(req, res, next) {
    const id = req.params.id;
    let title = req.body.title ? req.body.title: "";
    let genreId = req.body.genreId ? req.body.genreId: "";
    let directorId = req.body.directorId ? req.body.directorId: "";

    let genre = await Genre.findOne({"_id": genreId});
    let director = await Director.findOne({"_id": directorId});

    let movie = new Object({
        _title: title,
        _genre: genre,
        _director: director
    });

    Movie.findOneAndUpdate({"_id": id}, movie, { new: true })
        .then(obj => res.status(200).json({
            message: `Pelicula con id: ${id}, reemplazada`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: `No se pudo reemplazar la pelicula con id: ${id}`,
            obj: ex
        }));
}

async function update(req, res, next) {
    const id = req.params.id;
    let title = req.body.title;
    let genreId = req.body.genreId;
    let directorId = req.body.directorId;

    let genre = await Genre.findOne({"_id": genreId});
    let director = await Director.findOne({"_id": directorId});

    let movie = new Object();

    if(title) movie._title = title;
    if(genre) movie._genre = genre;
    if(director) movie._director = director;

    Movie.findOneAndUpdate({"_id": id}, movie, { new: true })
        .then(obj => res.status(200).json({
            message: `Pelicula con id: ${id}, reemplazada`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: `No se pudo actualizar la pelicula con id: ${id}`,
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Movie.remove({"_id": id})
        .then(obj => res.status(200).json({
            message: `Pelicula con id: ${id}, eliminada`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: `No se pudo eliminar la pelicula con id: ${id}`,
            obj: ex
        }));
}

module.exports = { list, index, create, replace, update, destroy };