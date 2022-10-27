const express = require('express');
const { Genre } = require('../db');

function list(req, res, next) {
    Genre.findAll({include: 'movies'})
        .then(objs => res.json(objs))
        .catch(err => res.send(err));
}

function index(req, res, next) {
    const id = req.params.id;
    Genre.findByPk(id)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}

function create(req, res, next) {
    const description = req.body.description;
    const status = req.body.status;

    let genre = new Object({
        description: description,
        status: status
    });

    Genre.create(genre)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}

function replace(req, res, next) {
    const id = req.params.id;
    Genre.findByPk(id)
        .then((obj) => {
            const description = req.body.description ? req.body.description : "";
            const status = req.body.status ? req.body.status : false;
            obj.update({description: description, status: status})
                .then(genre => res.json(genre))
                .catch(err => res.send(err));
        }).catch(err => res.send(err));
}

function update(req, res, next) {
    const id = req.params.id;
    Genre.findByPk(id)
        .then((obj) => {
            const description = req.body.description ? req.body.description : obj.description;
            const status = req.body.status ? req.body.status : obj.status;
            obj.update({description: description, status: status})
                .then(genre => res.json(genre))
                .catch(err => res.send(err));
        }).catch(err => res.send(err));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Genre.destroy({where: {id: id}})
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}

module.exports = { list, index, create, replace, update, destroy };