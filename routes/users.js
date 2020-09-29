const usersRouter = require('express').Router();
const { getAllUsers, getUser } = require('../controllers/users');

usersRouter.get('/users', getAllUsers);

usersRouter.get('/users/:id', getUser);

module.exports = usersRouter;
