const express = require('express');
const { Actor } = require('../db');

function list(req, res, next) {
    Actor.findAll({include: 'movies'})
        .then(objs => res.json(objs))
        .catch(err => res.send(err));
}

function index(req, res, next) {
    const id = req.params.id;
    Actor.findByPk(id)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}

function create(req, res, next) {
    const name = req.body.name;
    const last_name = req.body.last_name;

    let actor = new Object({
        name: name,
        last_name: last_name
    });

    Actor.create(actor)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}

function replace(req, res, next) {
    const id = req.params.id;
    Actor.findByPk(id)
        .then((obj) => {
            const name = req.body.name ? req.body.name : "";
            const last_name = req.body.last_name ? req.body.last_name : "";
            obj.update({name: name, last_name: last_name})
                .then(actor => res.json(actor))
                .catch(err => res.send(err));
        }).catch(err => res.send(err));
}

function update(req, res, next) {
    const id = req.params.id;
    Actor.findByPk(id)
        .then((obj) => {
            const name = req.body.name ? req.body.name : obj.name;
            const last_name = req.body.last_name ? req.body.last_name : obj.last_name;
            obj.update({name: name, last_name: last_name})
                .then(actor => res.json(actor))
                .catch(err => res.send(err));
        }).catch(err => res.send(err));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Actor.destroy({where: {id: id}})
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}

module.exports = { list, index, create, replace, update, destroy };