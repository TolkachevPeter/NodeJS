const usersRouter = require('express').Router();
const {
  getAllUsers,
  getUser,
  patchUser,
  patchUserAvatar,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/:id', getUser);
usersRouter.patch('/users/me', auth, patchUser);
usersRouter.patch('/users/me/avatar', auth, patchUserAvatar);

module.exports = usersRouter;
