const cardsRouter = require('express').Router();
const fsPromises = require('fs').promises;

cardsRouter.get('/cards', (req, res) => {
  fsPromises
    .readFile('data/cards.json', 'utf-8')
    .then((data) => {
      data = JSON.parse(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `Запрашиваемый ресурс не найден ${err}` });
    });
});

cardsRouter.get('*', (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = cardsRouter;
