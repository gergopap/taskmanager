const express = require('express');
const users = express();
const bcrypt = require('bcrypt');
const models = require('../models');
const jwt = require('jsonwebtoken');


//titkositas
users.post('/', (req, res) => {
  models.User.findOne({where: {username: req.body.username}}).then(user => {
    return res.status(400).send('Van már ilyen felhasználónév!');
  });
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      req.body.encryptedPassword = hash;
      models.User.create(req.body)
        .then(user => {
          res.json(user);
        });
    });
});


//visszafejtés
users.post('/login', (req, res) => {
  models.User.findOne({
    where: { username: req.body.username }
  }).then(user => {
    if (!user) {
      return res.status(400).send('Nincs ilyen felhasználó!');
    }
    bcrypt.compare(req.body.password, user.encryptedPassword)
      .then(isValid => {
        if (!isValid) {
          return res.status(401).send('Hibás jelszó!');
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '1h' }).toString();
        res.json({ token });
      });
  });
});

users.get('/me', (req, res) => {
  res.json(req.user);
});

users.put('/me', (req, res) => {
  req.user.update(req.body).then(user => {
    res.json(user);
  });
});

module.exports = users;
