const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getAllUsers,
  getUser,
  patchUser,
  patchUserAvatar,
} = require('../controllers/users');
const {
  avatarJoiModel,
  infoJoiModel,
} = require('../joi-models/index');
const auth = require('../middlewares/auth');

usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/:id', getUser);
usersRouter.patch('/users/me', celebrate({
  body: infoJoiModel,
}), auth, patchUser);
usersRouter.patch('/users/me/avatar', celebrate({
  body: avatarJoiModel,
}), auth, patchUserAvatar);

module.exports = usersRouter;
