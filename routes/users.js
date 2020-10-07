const usersRouter = require('express').Router();
const {
  getAllUsers,
  createUser,
  getUser,
  patchUser,
  patchUserAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getAllUsers);
usersRouter.post('/users', createUser);
usersRouter.get('/users/:id', getUser);
usersRouter.patch('/users/me', patchUser);
usersRouter.patch('/users/me/avatar', patchUserAvatar);

module.exports = usersRouter;
