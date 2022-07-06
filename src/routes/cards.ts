import express from 'express';
import { getAllCards, createCard, deleteCardById, likeCard, dislikeCard } from '../controllers/cards';
import { NotFoundError } from '../errors';
import { cardJoiModel, objectIdModel } from '../joi-models/index';
import auth from '../middlewares/auth';
const cardsRouter = express.Router();


cardsRouter.get('/cards', getAllCards);
cardsRouter.post('/cards', cardJoiModel, createCard);
cardsRouter.delete('/cards/:id', objectIdModel, auth, deleteCardById);
cardsRouter.put('/cards/:id/likes', objectIdModel, likeCard);
cardsRouter.delete('/cards/:id/likes', objectIdModel, dislikeCard);

cardsRouter.all('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

export default cardsRouter;
