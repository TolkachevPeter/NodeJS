const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `Запрашиваемый ресурс не найден ${err}` });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        return res.status(404).json({ message: `Карточка c id=${req.params.id} не найдена` });
      }
      return Card.findOneAndRemove({ _id: req.params.id, owner: req.user._id })
        .orFail()
        .then((found) => {
          if (!found) {
            return res.status(403).send({ message: 'Нет доступа к карточке' });
          }
          return res.status(200).send(found);
        });
    })
    .catch((err) => {
      console.error('err = ', err.message);
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).json({ message: 'Карточка не найдена' });
      }

      res.status(500).json({ message: 'Ошибка на сервере' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      console.error('err = ', err.message);
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).json({ message: 'Карточка не найдена' });
      }

      res.status(500).json({ message: 'Ошибка на сервере' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      console.error('err = ', err.message);
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).json({ message: 'Карточка не найдена' });
      }

      res.status(500).json({ message: 'Ошибка на сервере' });
    });
};
