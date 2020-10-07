const cardsRouter = require('express').Router();
const {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', getAllCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:id', deleteCardById);
cardsRouter.put('/cards/:id/likes', likeCard);
cardsRouter.delete('/cards/:id/likes', dislikeCard);

cardsRouter.get('*', (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = cardsRouter;
