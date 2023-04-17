const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { auth } = require('../utils/errMess');

module.exports = (req, res, next) => {
  // тут вся авторизация
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(auth.needAuth);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'verySecretSolt');
  } catch (err) {
    throw new AuthError(auth.needAuth);
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
