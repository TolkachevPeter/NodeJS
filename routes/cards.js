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
const { cardJoiModel } = require('../joi-models/index');
const auth = require('../middlewares/auth');

cardsRouter.get('/cards', getAllCards);
cardsRouter.post('/cards', cardJoiModel, createCard);
cardsRouter.delete('/cards/:id', auth, deleteCardById);
cardsRouter.put('/cards/:id/likes', likeCard);
cardsRouter.delete('/cards/:id/likes', dislikeCard);

cardsRouter.get('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = cardsRouter;
