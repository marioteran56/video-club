const express = require('express');
const { Copy } = require('../db');

function list(req, res, next) {
    Copy.findAll({include: ['bookings', 'movie']})
        .then(objs => res.json(objs))
        .catch(err => res.send(err));
}

function index(req, res, next) {
    const id = req.params.id;
    Copy.findByPk(id)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}

function create(req, res, next) {
    const number = req.body.number;
    const format = req.body.format;
    const status = req.body.status;
    const movieId = req.body.movieId;

    let copy = new Object({
        number: number,
        format: format,
        status: status,
        movieId: movieId
    });

    Copy.create(copy)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}

function replace(req, res, next) {
    const id = req.params.id;
    Copy.findByPk(id)
        .then((obj) => {
            const number = req.body.number ? req.body.number : "";
            const format = req.body.format ? req.body.format : 'DVD';
            const status = req.body.status ? req.body.status : 'LOST';
            const movieId = req.body.movieId ? req.body.movieId : null;
            obj.update({number: number, format: format, status: status, movieId: movieId})
                .then(copy => res.json(copy))
                .catch(err => res.send(err));
        }).catch(err => res.send(err));
}

function update(req, res, next) {
    const id = req.params.id;
    Copy.findByPk(id)
        .then((obj) => {
            const number = req.body.number ? req.body.number : obj.number;
            const format = req.body.format ? req.body.format : obj.format;
            const status = req.body.status ? req.body.status : obj.status;
            const movieId = req.body.movieId ? req.body.movieId : obj.movieId;
            obj.update({number: number, format: format, status: status, movieId: movieId})
                .then(copy => res.json(copy))
                .catch(err => res.send(err));
        }).catch(err => res.send(err));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Copy.destroy({where: {id: id}})
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}

module.exports = { list, index, create, replace, update, destroy };