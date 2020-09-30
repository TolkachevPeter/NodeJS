const usersRouter = require('express').Router();
const {
  getAllUsers,
  createUser,
  getUser,
  patchUser,
} = require('../controllers/users');

usersRouter.get('/users', getAllUsers);
usersRouter.post('/users', createUser);
usersRouter.get('/users/:id', getUser);
usersRouter.patch('/users/me', patchUser);

module.exports = usersRouter;
