const express = require('express');
const { Director } = require('../db');
const director = require('../models/director');

function list(req, res, next) {
    Director.findAll({include: 'movies'})
        .then(objs => res.json(objs))
        .catch(err => res.send(err));
}

function index(req, res, next) {
    const id = req.params.id;
    Director.findByPk(id)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}

function create(req, res, next) {
    const name = req.body.name;
    const last_name = req.body.last_name;

    let director = new Object({
        name: name,
        last_name: last_name
    });

    Director.create(director)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}

function replace(req, res, next) {
    const id = req.params.id;
    Director.findByPk(id)
        .then((obj) => {
            const name = req.body.name ? req.body.name : "";
            const last_name = req.body.last_name ? req.body.last_name : "";
            obj.update({name: name, last_name: last_name})
                .then(director => res.json(director))
                .catch(err => res.send(err));
        }).catch(err => res.send(err));
}

function update(req, res, next) {
    const id = req.params.id;
    Director.findByPk(id)
        .then((obj) => {
            const name = req.body.name ? req.body.name : obj.name;
            const last_name = req.body.last_name ? req.body.last_name : obj.last_name;
            obj.update({name: name, last_name: last_name})
                .then(director => res.json(director))
                .catch(err => res.send(err));
        }).catch(err => res.send(err));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Director.destroy({where: {id: id}})
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}

module.exports = { list, index, create, replace, update, destroy };