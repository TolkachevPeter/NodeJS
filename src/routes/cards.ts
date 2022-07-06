const cardsRouter = require('express').Router();
const {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  NotFoundError,
} = require('../errors');
const { cardJoiModel, objectIdModel } = require('../joi-models/index');
const auth = require('../middlewares/auth');

cardsRouter.get('/cards', getAllCards);
cardsRouter.post('/cards', cardJoiModel, createCard);
cardsRouter.delete('/cards/:id', objectIdModel, auth, deleteCardById);
cardsRouter.put('/cards/:id/likes', objectIdModel, likeCard);
cardsRouter.delete('/cards/:id/likes', objectIdModel, dislikeCard);

cardsRouter.all('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

export default cardsRouter;
