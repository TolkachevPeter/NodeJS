const usersRouter = require('express').Router();
const {
  getAllUsers,
  getUser,
  patchUser,
  patchUserAvatar,
} = require('../controllers/users');
const {
  infoJoiModel,
  avatarJoiModel,
  objectIdModel,
} = require('../joi-models/index.js');
const auth = require('../middlewares/auth');

usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/:id', objectIdModel, getUser);
usersRouter.patch('/users/me', infoJoiModel, auth, patchUser);
usersRouter.patch('/users/me/avatar', avatarJoiModel, auth, patchUserAvatar);

export default usersRouter;
