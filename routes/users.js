const usersRouter = require('express').Router();
const fsPromises = require('fs').promises;
const users = require('../data/users.json');

usersRouter.get('/users', (req, res) => {
  fsPromises.readFile('data/users.json', 'utf-8')
  .then(data => {
    data = JSON.parse(data);
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(404).json({ message : "Нет пользователя с таким id" })
  })
})

usersRouter.get('/users/:id', (req, res) =>{



  fsPromises.readFile('data/users.json', 'utf-8')
  .then(data => {
    const user = users.find(item => item._id == req.params.id);
    const { name, about, _id } = user;
    res.status(200).send(`Пользователь с именем ${name}, о себе: ${about}, id: ${_id}.`);
  })
  .catch(err => {
    res.status(404).json({ message: "Нет пользователя с таким id" })
  })
});

module.exports = usersRouter;