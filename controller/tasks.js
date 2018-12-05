const express = require('express');
const tasks = express();
const models = require('../models');
const Sequelize = require('sequelize');

tasks.get('/', (req, res) => {
  models.Task.findAll().then(tasks => {
    res.json(tasks);
  });
});

tasks.get('/:id', (req, res) => {
  models.Task.findById(req.params.id).then(tasks => {
    if (!tasks) {
      return res.status(400).send({
        statusCode: 400,
        error: 'bad request',
        messege: 'not found'
      });
    } else {
      res.json(tasks);
    }
  });
});

tasks.post('/', (req, res) => {
  models.Task.findOne({ where: { name: req.body.name } }).then(result => {
    if (result) {
      return res.status(400).send({
        statusCode: 400,
        error: 'bad request',
        messege: 'Van már ilyen'
      });
    } else {
      models.Task.create({
        name: req.body.name,
        messege: req.body.messege
      }).then(tasks => {
        res.json(tasks);
      });
    }
  });
});

tasks.put('/:id', (req, res) => {
  models.Task.findOne({ where: { name: req.body.name } }).then(result => {
    if (result) {
      return res.status(400).send({
        statusCode: 400,
        error: 'bad request',
        messege: 'Van már ilyen'
      });
    } else {
      models.Task.update(
        req.body,
        { where: { id: req.params.id } }
      ).then(tasks => {
        res.json(tasks);
      });
    }
  });
});

tasks.delete('/:id', (req, res) => {
  models.Task.destroy({ where: { id: req.params.id } }).then(tasks => {
    if (!tasks) {
      return res.status(400).send({
        statusCode: 400,
        error: 'bad request',
        messege: 'not found'
      });
    } else {
      res.json(tasks);
    }
  });
});

module.exports = tasks;
