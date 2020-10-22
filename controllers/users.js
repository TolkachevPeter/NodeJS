const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require('../errors');

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  const regex = /\s/g;
  if (regex.test(password)) {
    throw new BadRequestError('Пароль не может содержать пробелы');
  } else if (password.length < 8) {
    throw new BadRequestError('Пароль должен содержать более 8 символов');
  } else if (!password) {
    throw new BadRequestError('Пароль обязателен для всех');
  }
  return bcryptjs.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.status(201).send({
        data: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        },
      }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          const e = new BadRequestError(err.message);
          next(e);
        } else if (err.code === 11000 && err.name === 'MongoError') {
          res.status(409).send({ message: 'Пользователь с таким e-mail уже существует' });
        } else next(err);
      }));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
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

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        const e = new NotFoundError('Пользлватель не найден');
        next(e);
      } else if (err.name === 'CastError') {
        const e = new BadRequestError('Переданы некорректные данные');
        next(e);
      } else next(err);
    });
};

module.exports.patchUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const e = new BadRequestError(err.message);
        next(e);
      } else next(err);
    });
};

module.exports.patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const opts = { runValidators: true };
  User.findByIdAndUpdate(req.user._id, { avatar }, opts, { new: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const e = new BadRequestError(err.message);
        next(e);
      } else next(err);
    });
};
