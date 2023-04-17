const mongoose = require('mongoose');
const validator = require('validator/');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/AuthError');
const errMess = require('../utils/errMess');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, errMess.conflict.email],
    validate: {
      validator: (email) => validator.isEmail(email),
      message: errMess.notValid.email,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function loginUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        // ошибка 'Пользователь с такой почтой не найден' код 401
        throw new AuthError(errMess.auth.incorrectData);
      }
      // юзер найден
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // ошибка 'Неправильные почта или пароль' код 401
            throw new AuthError(errMess.auth.incorrectData);
          }
          // аутентификация успешна
          // отправка данных пользователя
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
