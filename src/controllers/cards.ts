import { Request, Response, NextFunction } from 'express';
import Card from '../models/card';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors';

export const getAllCards = (req:Request, res: Response, next: NextFunction): void => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(next);
};

export const createCard = (req:Request, res: Response, next: NextFunction): void => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else next(err);
    });
};

export const deleteCardById = (req:Request, res: Response, next: NextFunction): void => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточка c id=${req.params.id} не найдена`);
      } else if (card.owner._id.toString() !== req.user._id) {
        throw new UnauthorizedError('Нет доступа к карточке');
      }
      return Card.findOneAndRemove({ _id: req.params.id, owner: req.user._id })
        .then((found) => res.status(200).send(found));
    })
    .catch((err) => {
      console.error('err = ', err.message);
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточка не найдена'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else next(err);
    });
};

export const likeCard = (req:Request, res: Response, next: NextFunction): void => {
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
        next(new NotFoundError('Карточка не найдена'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else next(err);
    });
};

export const dislikeCard = (req:Request, res: Response, next: NextFunction): void => {
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
        next(new NotFoundError('Карточка не найдена'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else next(err);
    });
};
