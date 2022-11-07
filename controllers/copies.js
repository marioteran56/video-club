const express = require('express');
const Copy = require('../models/copy');
const Movie = require('../models/movie');

function list(req, res, next) {
    Copy.find().populate("_movie")
        .then(objs => res.status(200).json({
            message: "Lista de copias",
            obj: objs
        }))
        .catch(ex => res.status(500).json({
            message: "No se pudo consultar la lista de copias",
            obj: ex
        }));
}

function index(req, res, next) {
    const id = req.params.id;
    Copy.findOne({"_id": id})
        .then(obj => res.status(200).json({
            message: `Copia con id: ${id}`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: `No se pudo consultar la copia con id: ${id}`,
            obj: ex
        }));
}

async function create(req, res, next) {
    const number = req.body.number;
    const format = req.body.format;
    const movieId = req.body.movieId;
    const status = req.body.status;

    let movie = await Movie.findOne({"_id": movieId});

    let copy = new Copy({
        number: number,
        format: format,
        movie: movie,
        status: status
    });
    
    copy.save()
        .then(obj => res.status(200).json({
            message: "Copia creada correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: "No se pudo guardar la copia",
            obj: ex
        }));
}

async function replace(req, res, next) {
    const id = req.params.id;
    let number = req.body.number ? req.body.number: -1;
    let format = req.body.format ? req.body.format: "";
    let movieId = req.body.movieId ? req.body.movieId: "";
    let status = req.body.status ? req.body.status: "";

    let movie = await Movie.findOne({"_id": movieId});

    let copy = new Object({
        _number: number,
        _format: format,
        _movie: movie,
        _status: status
    });

    Copy.findOneAndUpdate({"_id": id}, copy, { new: true })
        .then(obj => res.status(200).json({
            message: `Copia con id: ${id}, reemplazada`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: `No se pudo reemplazar la copia con id: ${id}`,
            obj: ex
        }));
}

async function update(req, res, next) {
    const id = req.params.id;
    let number = req.body.number;
    let format = req.body.format;
    let movieId = req.body.movieId;
    let status = req.body.status;

    let movie = await Movie.findOne({"_id": movieId});

    let copy = new Object();

    if(number) copy._number = number;
    if(format) copy._format = format;
    if(movie) copy._movie = movie;
    if(status) copy._status = status;

    Copy.findOneAndUpdate({"_id": id}, copy, { new: true })
        .then(obj => res.status(200).json({
            message: `Copia con id: ${id}, reemplazada`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: `No se pudo actualizar la copia con id: ${id}`,
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Copy.remove({"_id": id})
        .then(obj => res.status(200).json({
            message: `Copia con id: ${id}, eliminada`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: `No se pudo eliminar la copia con id: ${id}`,
            obj: ex
        }));
}

module.exports = { list, index, create, replace, update, destroy };