const express = require('express');
const Member = require('../models/member');

function list(req, res, next) {
    Member.find().populate()
        .then(objs => res.status(200).json({
            message: "Lista de miembros",
            obj: objs
        }))
        .catch(ex => res.status(500).json({
            message: "No se pudo consultar la lista de miembros",
            obj: ex
        }));
}

function index(req, res, next) {
    const id = req.params.id;
    Member.findOne({"_id": id})
        .then(obj => res.status(200).json({
            message: `Miembro con id: ${id}`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: `No se pudo consultar el miembro con id: ${id}`,
            obj: ex
        }));
}

async function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;
    const address = req.body.address;
    const phone = req.body.phone;

    let member = new Member({
        name: name,
        lastName: lastName,
        address: address,
        phone: phone
    });
    
    member.save()
        .then(obj => res.status(200).json({
            message: "Miembro creado correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: "No se pudo guardar el miembro",
            obj: ex
        }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name: "";
    let lastName = req.body.lastName ? req.body.lastName: "";
    let address = req.body.address ? req.body.address: "";
    let phone = req.body.phone ? req.body.phone: "";

    let member = new Object({
        _name: name,
        _lastName: lastName,
        _address: address,
        _phone: phone
    });

    Member.findOneAndUpdate({"_id": id}, member, { new: true })
        .then(obj => res.status(200).json({
            message: `Miembro con id: ${id}, reemplazado`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: `No se pudo reemplazar el miembro con id: ${id}`,
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let address = req.body.address;
    let phone = req.body.phone;

    let member = new Object();

    if(name) member._name = name;
    if(lastName) member._lastName = lastName;
    if(address) member._address = address;
    if(phone) member._phone = phone;
    
    Member.findOneAndUpdate({"_id": id}, member, { new: true })
        .then(obj => res.status(200).json({
            message: `Miembro con id: ${id}, reemplazado`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: `No se pudo actualizar el miembro con id: ${id}`,
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Member.remove({"_id": id})
        .then(obj => res.status(200).json({
            message: `Miembro con id: ${id}, eliminado`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: `No se pudo eliminar el miembro con id: ${id}`,
            obj: ex
        }));
}

module.exports = { list, index, create, replace, update, destroy };