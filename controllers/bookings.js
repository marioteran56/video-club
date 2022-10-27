const express = require('express');
const { NOW } = require('sequelize');
const { Booking } = require('../db');

function list(req, res, next) {
    Booking.findAll({include: ['member', 'copy']})
        .then(objs => res.json(objs))
        .catch(err => res.send(err));
}

function index(req, res, next) {
    const id = req.params.id;
    Booking.findByPk(id)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}

function create(req, res, next) {
    const date = req.body.date;
    const memberId = req.body.memberId;
    const copyId = req.body.copyId;

    let booking = new Object({
        date: date,
        memberId: memberId,
        copyId: copyId
    });

    Booking.create(booking)
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}

function replace(req, res, next) {
    const id = req.params.id;
    Booking.findByPk(id)
        .then((obj) => {
            const date = req.body.date ? req.body.date : NOW;
            const memberId = req.body.memberId ? req.body.memberId : null;
            const copyId = req.body.copyId ? req.body.copyId : null;
            obj.update({date: date, memberId: memberId, copyId: copyId})
                .then(booking => res.json(booking))
                .catch(err => res.send(err));
        }).catch(err => res.send(err));
}

function update(req, res, next) {
    const id = req.params.id;
    Booking.findByPk(id)
        .then((obj) => {
            const date = req.body.date ? req.body.date : obj.date;
            const memberId = req.body.memberId ? req.body.memberId : obj.memberId;
            const copyId = req.body.copyId ? req.body.copyId : obj.copyId;
            obj.update({date: date, memberId: memberId, copyId: copyId})
                .then(booking => res.json(booking))
                .catch(err => res.send(err));
        }).catch(err => res.send(err));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Booking.destroy({where: {id: id}})
        .then(obj => res.json(obj))
        .catch(err => res.send(err));
}

module.exports = { list, index, create, replace, update, destroy };