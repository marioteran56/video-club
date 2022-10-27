const express = require('express');
const { Movie, Actor } = require('../db');

function list(req, res, next) {
    Movie.findAll({include: ['genre', 'director', 'actors']})
        .then(objs => res.json(objs))
        .catch(err => res.send(err));
}

function index(req, res, next) {
    const id = req.params.id;
    Movie.findByPk(id)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}

function create(req, res, next) {
    const title = req.body.title;
    const genreId = req.body.genreId;
    const directorId = req.body.directorId;

    let movie = new Object({
        title: title,
        genreId: genreId,
        directorId: directorId
    });

    Movie.create(movie)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}

function addActor(req, res, next) {
    const idMovie = req.body.idMovie;
    const idActor = req.body.idActor;
    
    Movie.findByPk(idMovie)
        .then((movie) => {
            Actor.findByPk(idActor)
                .then((actor) => {
                    movie.addActor(actor);
                    res.json(movie);
                })
                .catch((err) => res.send(err));
        })
        .catch((err) => res.send(err));
}

function replace(req, res, next) {
    const id = req.params.id;
    Movie.findByPk(id)
        .then((obj) => {
            const title = req.body.title ? req.body.title : "";
            const genreId = req.body.genreId ? req.body.genreId : null;
            const directorId = req.body.directorId ? req.body.directorId : null;
            obj.update({title: title, genreId: genreId})
                .then(movie => res.json(movie))
                .catch(err => res.send(err));
        }).catch(err => res.send(err));
}

function update(req, res, next) {
    const id = req.params.id;
    Movie.findByPk(id)
        .then((obj) => {
            const title = req.body.title ? req.body.title : obj.title;
            const genreId = req.body.genreId ? req.body.genreId : obj.genreId;
            const directorId = req.body.directorId ? req.body.directorId : obj.directorId;
            obj.update({title: title, genreId: genreId})
                .then(movie => res.json(movie))
                .catch(err => res.send(err));
        }).catch(err => res.send(err));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Movie.destroy({where: {id: id}})
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}

module.exports = { list, index, create, replace, update, destroy, addActor };