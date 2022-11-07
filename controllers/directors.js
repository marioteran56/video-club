const express = require('express');
const Director = require('../models/director');

function list(req, res, next) {
    Director.find()
        .then(objs => res.status(200).json({
            message: "Lista de directores",
            obj: objs
        }))
        .catch(ex => res.status(500).json({
            message: "No se pudo consultar la lista de directores",
            obj: ex
        }));
}

function index(req, res, next) {
    const id = req.params.id;
    Director.findOne({"_id": id})
        .then(obj => res.status(200).json({
            message: `Director con id: ${id}`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: `No se pudo consultar el director con id: ${id}`,
            obj: ex
        }));
}

function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;

    let director = new Director({
        name: name,
        lastName: lastName
    });
    
    director.save()
        .then(obj => res.status(200).json({
            message: "Director creado correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: "No se pudo guardar el director",
            obj: ex
        }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name: "";
    let lastName = req.body.lastName ? req.body.lastName: "";

    let director = new Object({
        _name: name,
        _lastName: lastName
    });

    Director.findOneAndUpdate({"_id": id}, director, { new: true })
        .then(obj => res.status(200).json({
            message: `Director con id: ${id}, reemplazado`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: `No se pudo reemplazar el director con id: ${id}`,
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;

    let director = new Object();

    if(name) director._name = name;
    if(lastName) director._lastName = lastName;

    Director.findOneAndUpdate({"_id": id}, director, { new: true })
        .then(obj => res.status(200).json({
            message: `Director con id: ${id}, actualizado`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: `No se pudo actualizar el director con id: ${id}`,
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Director.remove({"_id": id})
        .then(obj => res.status(200).json({
            message: `Director con id: ${id}, eliminado`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: `No se pudo eliminar el director con id: ${id}`,
            obj: ex
        }));
}

module.exports = { list, index, create, replace, update, destroy };