const usersRouter = require('express').Router();
// импрот контроллеров
const {
  getUser,
  patchUser,
} = require('../controllers/usersContoller');
// импорт валидаторов
const { patchUserValidator } = require('../middlewares/validator');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', patchUserValidator, patchUser);
// экпорт роутера
module.exports = usersRouter;
