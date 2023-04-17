const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // импорт схемы
// импорт ошибок
const BadReqError = require('../errors/BadReqError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const errMess = require('../utils/errMess');

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    })
      .then((user) => {
        res.status(201).send({
          data: {
            email: user.email,
            name: user.name,
          },
        });
      })
    // данные не записались, вернём ошибку
      .catch((err) => {
        if (err.name === 'ValidationError') next(new BadReqError(errMess.badReq.registerUser));
        if (err.code === 11000) next(new ConflictError(errMess.conflict.email));
        next(err);
      }));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign(
        { _id: user._id }, 'verySecretSolt',
        { expiresIn: '7d' },
      );
      res
        .status(200)
        .send({ token });
    })
    .catch(next);
};


module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id, {})
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

module.exports.patchUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errMess.notFound.userById);
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadReqError(errMess.badReq.updateUser));
      if (err.name === 'CastError') next(new BadReqError(errMess.badReq.updateUser));
      if (err.code === 11000) next(new ConflictError(errMess.conflict.email));
      next(err);
    });
};
