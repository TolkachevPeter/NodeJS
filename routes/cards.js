const cardsRouter = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

cardsRouter.get('/cards', (req, res) => {
  const filepath = path.join(__dirname, '../data/cards.json');
  fsPromises
    .readFile(filepath, { enconding: 'utf8' })
    .then((data) => {
      const information = JSON.parse(data);
      res.status(200).json(information);
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
