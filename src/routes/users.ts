import express from 'express';
import { getAllUsers, getUser, patchUser, patchUserAvatar } from '../controllers/users';
import { infoJoiModel, avatarJoiModel, objectIdModel } from '../joi-models/index';
import auth from '../middlewares/auth';
const usersRouter = express.Router();


usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/:id', objectIdModel, getUser);
usersRouter.patch('/users/me', infoJoiModel, auth, patchUser);
usersRouter.patch('/users/me/avatar', avatarJoiModel, auth, patchUserAvatar);

export default usersRouter;
