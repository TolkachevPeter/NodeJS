const usersRouter = require('express').Router();
const fsPromises = require('fs').promises;
// const users = require('../data/users.json');

usersRouter.get('/users', (req, res) => {
  fsPromises.readFile('data/users.json', 'utf-8')
    .then((data) => {
      data = JSON.parse(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: `Нет пользователя с таким id ${err}` });
    });
});

usersRouter.get('/users/:id', (req, res) =>{
  fsPromises.readFile('data/users.json', 'utf-8')
    .then((data) => {
      data = JSON.parse(data);
      const user = data.find((item) => item._id === req.params.id);
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: `Нет пользователя с таким id ${err}` });
    });
});

module.exports = usersRouter;
