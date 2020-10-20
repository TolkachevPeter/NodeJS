const Card = require('../models/card');
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require('../errors');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => next(new BadRequestError(err.message)));
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточка c id=${req.params.id} не найдена`);
      } else if (card.owner._id.toString() !== req.user._id) {
        throw new UnauthorizedError('Нет доступа к карточке');
      }
      return Card.findOneAndRemove({ _id: req.params.id, owner: req.user._id })
        .orFail()
        .then((found) => res.status(200).send(found));
    })
    .catch((err) => {
      console.error('err = ', err.message);
      if (err.name === 'DocumentNotFoundError') {
        const e = new NotFoundError('Карточка не найдена');
        next(e);
      } else if (err.name === 'CastError') {
        const e = new BadRequestError('Переданы некорректные данные');
        next(e);
      } else next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
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
        const e = new NotFoundError('Карточка не найдена');
        next(e);
      } else if (err.name === 'CastError') {
        const e = new BadRequestError('Переданы некорректные данные');
        next(e);
      } else next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
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
        const e = new NotFoundError('Карточка не найдена');
        next(e);
      } else if (err.name === 'CastError') {
        const e = new BadRequestError('Переданы некорректные данные');
        next(e);
      } else next(err);
    });
};
