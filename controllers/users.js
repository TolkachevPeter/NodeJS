const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  const regex = /\s/g;
  if (regex.test(password)) {
    res.status(400).send({ message: 'Пароль не может содержать пробелы' });
  } else if (password.length < 8) {
    res.status(400).send({ message: 'Пароль должен содержать более 8 символов' });
  } else if (!password) {
    res.status(400).send({ message: 'Пароль обязателен для всех' });
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
          res.status(400).send({ message: err.message });
        } else if (err.code === 11000) {
          res.status(409).send({ message: 'Пользователь с таким e-mail уже существует' });
          return;
        }
        res.status(500).send({ message: 'Ошибка на сервере' });
      }));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.error('err = ', err.message);
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).json({ message: 'Пользлватель не найден' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      }

      res.status(500).json({ message: 'Ошибка на сервере' });
    });
};

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};
