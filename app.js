const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000, BASE_PATH } = process.env;
const { errors, celebrate } = require('celebrate');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorMain = require('./middlewares/error-main');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  createUserJoiModel,
  loginJoiModel,
} = require('./joi-models/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);

app.post('/signin', celebrate({
  body: loginJoiModel,
}), login);
app.post('/signup', celebrate({
  body: createUserJoiModel,
}), createUser);

app.use(auth);

app.use('/', usersRouter);
app.use('/', cardsRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorMain);

app.listen(PORT, () => {
  console.log('Ссылка на сервер:');
  console.log(BASE_PATH);
});
