const express = require('express');
const Booking = require('../models/booking');
const Member = require('../models/member');
const Copy = require('../models/copy');

function list(req, res, next) {
    Booking.find().populate(["_member", "_copy"])
        .then(objs => res.status(200).json({
            message: "Lista de reservas",
            obj: objs
        }))
        .catch(ex => res.status(500).json({
            message: "No se pudo consultar la lista de reservas",
            obj: ex
        }));
}

function index(req, res, next) {
    const id = req.params.id;
    Booking.findOne({"_id": id})
        .then(obj => res.status(200).json({
            message: `Reserva con id: ${id}`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: `No se pudo consultar la reserva con id: ${id}`,
            obj: ex
        }));
}

async function create(req, res, next) {
    const date = req.body.date;
    const memberId = req.body.memberId;
    const copyId = req.body.copyId;

    let member = await Member.findOne({"_id": memberId});
    let copy = await Copy.findOne({"_id": copyId});

    let booking = new Booking({
        date: date,
        member: member,
        copy: copy
    });
    
    booking.save()
        .then(obj => res.status(200).json({
            message: "Reserva creada correctamente",
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: "No se pudo guardar la reserva",
            obj: ex
        }));
}

async function replace(req, res, next) {
    const id = req.params.id;
    let date = req.body.date ? req.body.date: Date.now();
    let memberId = req.body.memberId ? req.body.memberId: "";
    let copyId = req.body.copyId ? req.body.copyId: "";

    let member = await Member.findOne({"_id": memberId});
    let copy = await Copy.findOne({"_id": copyId});

    let booking = new Object({
        _date: date,
        _member: member,
        _copy: copy
    });

    Booking.findOneAndUpdate({"_id": id}, booking, { new: true })
        .then(obj => res.status(200).json({
            message: `Reserva con id: ${id}, reemplazada`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: `No se pudo reemplazar la reserva con id: ${id}`,
            obj: ex
        }));
}

async function update(req, res, next) {
    const id = req.params.id;
    let date = req.body.date;
    let memberId = req.body.memberId;
    let copyId = req.body.copyId;

    let member = await Member.findOne({"_id": memberId});
    let copy = await Copy.findOne({"_id": copyId});

    let booking = new Object();

    if(date) booking._date = date;
    if(member) booking._member = member;
    if(copy) booking._copy = copy;

    Booking.findOneAndUpdate({"_id": id}, booking, { new: true })
        .then(obj => res.status(200).json({
            message: `Reserva con id: ${id}, reemplazada`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: `No se pudo actualizar la reserva con id: ${id}`,
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;
    Booking.remove({"_id": id})
        .then(obj => res.status(200).json({
            message: `Reserva con id: ${id}, eliminada`,
            obj: obj
        }))
        .catch(ex => res.status(500).json({
            message: `No se pudo eliminar la reserva con id: ${id}`,
            obj: ex
        }));
}

module.exports = { list, index, create, replace, update, destroy };