const usersRouter = require('express').Router();
const { getAllUsers, createUser, getUser } = require('../controllers/users');

usersRouter.get('/users', getAllUsers);
usersRouter.post('/users', createUser);
usersRouter.get('/users/:id', getUser);

module.exports = usersRouter;
