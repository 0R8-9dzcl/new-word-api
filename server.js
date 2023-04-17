const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate'); // валидатор запросов
const cors = require('cors'); // импорт CORS
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger'); // импорт логов
const centralError = require('./middlewares/centralError'); // централизованный обработчик ошибок

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/newWords');

const server = express();

server.use(requestLogger); // подключаем логгер запросов

server.use(cors()); // отключаю корс

// подключаю парсеры
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(routes);

server.use(errorLogger); // подключаем логгер ошибок
server.use(errors()); // обработчик ошибок celebrate
// Централизованная обработка ошибок
server.use(centralError);

server.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`server listening on port ${PORT}`);
});