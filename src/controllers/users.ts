import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import {
  BadRequestError, NotFoundError, UnauthorizedError, ConflictError,
} from '../errors';

import { passwordModel } from '../joi-models/index';

export const getAllUsers = (req:Request, res: Response, next: NextFunction): void => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch(next);
};

export const createUser = (req:Request, res: Response, next: NextFunction) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  if (password.length < 8) {
    throw new BadRequestError('Пароль должен содержать более 8 символов');
  } else if (!password) {
    throw new BadRequestError('Пароль обязателен для всех');
  } else if (!passwordModel) {
    throw new BadRequestError('Пароль должен содержать латиницу и арабские цифры');
  }
  return bcryptjs.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user: any) => res.status(201).send({
        data: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        },
      }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError(err.message));
        } else if (err.code === 11000 && err.name === 'MongoError') {
          next(new ConflictError('Пользователь с таким e-mail уже существует'));
        } else next(err);
      }));
};

export const login = (req:Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;

  return (User as any).findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      next(new UnauthorizedError(err.message));
    });
};

export const getUser = (req:Request, res: Response, next: NextFunction): void => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Пользователь не найден'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else next(err);
    });
};

export const patchUser = (req:Request, res: Response, next: NextFunction): void => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else next(err);
    });
};

export const patchUserAvatar = (req:Request, res: Response, next: NextFunction): void => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else next(err);
    });
};
