const express = require('express');

function list(req, res, next) {
    res.send('respond with LIST');
}

function index(req, res, next) {
    const id = req.params.id;
    res.send(`respond with INDEX => ${id}`);
}

function create(req, res, next) {
    res.send(`respond with CREATE`);
}

function replace(req, res, next) {
    const id = req.params.id;
    res.send(`respond with REPLACE => ${id}`);
}

function update(req, res, next) {
    const id = req.params.id;
    res.send(`respond with UPDATE => ${id}`);
}

function destroy(req, res, next) {
    const id = req.params.id;
    res.send(`respond with DESTROY => ${id}`);
}

module.exports = { list, index, create, replace, update, destroy };