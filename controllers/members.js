const express = require('express');
const { Member } = require('../db');

function list(req, res, next) {
    Member.findAll({include: 'bookings'})
        .then(objs => res.json(objs))
        .catch(err => res.send(err));
}

function index(req, res, next) {
    const id = req.params.id;
    Member.findByPk(id)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}

function create(req, res, next) {
    const name = req.body.name;
    const last_name = req.body.last_name;
    const address = req.body.address;
    const phone = req.body.phone;
    const status = req.body.status;

    let member = new Object({
        name: name,
        last_name: last_name,
        address: address,
        phone: phone,
        status: status
    });

    Member.create(member)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}

function replace(req, res, next) {
    const id = req.params.id;
    Member.findByPk(id)
        .then((obj) => {
            const name = req.body.name ? req.body.name : "";
            const last_name = req.body.last_name ? req.body.last_name : "";
            const address = req.body.address ? req.body.address : "";
            const phone = req.body.phone ? req.body.phone : "";
            const status = req.body.status ? req.body.status : false;
            obj.update({name: name, last_name: last_name, address: address, phone: phone, status: status})
                .then(member => res.json(member))
                .catch(err => res.send(err));
        }).catch(err => res.send(err));
}

function update(req, res, next) {
    const id = req.params.id;
    Member.findByPk(id)
        .then((obj) => {
            const name = req.body.name ? req.body.name : obj.name;
            const last_name = req.body.last_name ? req.body.last_name : obj.last_name;
            const address = req.body.address ? req.body.address : obj.address;
            const phone = req.body.phone ? req.body.phone : obj.phone;
            const status = req.body.status ? req.body.status : obj.status;
            obj.update({name: name, last_name: last_name, address: address, phone: phone, status: status})
                .then(member => res.json(member))
                .catch(err => res.send(err));
        }).catch(err => res.send(err));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Member.destroy({where: {id: id}})
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}

module.exports = { list, index, create, replace, update, destroy };