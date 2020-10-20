const cardsRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  cardJoiModel,
} = require('../joi-models/index');
const auth = require('../middlewares/auth');

cardsRouter.get('/cards', getAllCards);
cardsRouter.post('/cards', celebrate({
  body: cardJoiModel,
}), createCard);
cardsRouter.delete('/cards/:id', auth, deleteCardById);
cardsRouter.put('/cards/:id/likes', likeCard);
cardsRouter.delete('/cards/:id/likes', dislikeCard);

cardsRouter.get('*', (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = cardsRouter;
