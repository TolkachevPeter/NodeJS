const express = require('express');
const { PORT = 3000, BASE_PATH } = process.env;
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');

const app = express();

app.use(express.static('public'));
app.use('/', usersRouter);
app.use('/', cardsRouter);

app.listen(PORT, () => {
  console.log('Ссылка на сервер:');
  console.log(BASE_PATH);
  //почему путь выдает undefined?
});