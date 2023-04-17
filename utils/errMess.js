module.exports = {
  notFound: {
    url: 'Запрашиваемый ресурс не найден',
    wordById: 'Слово по указанному id не найдено',
    userById: 'Пользователь по указанному _id не найден',
  },
  badReq: {
    createWord: 'Переданы некорректные данные при добавлении слова',
    wordDelete: 'Переданы некорректные данные при удалении слова',
    registerUser: 'Переданы некорректные данные при создании пользователя',
    updateUser: 'Переданы некорректные данные при обновлении данных пользователя',
    updateWord: 'Переданы некорректные данные при обновлении слова',
  },
  forbid: {
    notOwn: 'Слово добавлено другим пользователем',
  },
  conflict: {
    email: 'Пользователь с таким адресом электроной почты уже зарегистрирован!',
  },
  auth: {
    needAuth: 'Необходима авторизация',
    incorrectData: 'Неправильные почта или пароль',
  },
  tooMany: {
    requests: 'Слишком много запросов',
  },
  server: {
    error: 'На сервере произошла ошибка',
  },
  notValid: {
    email: 'Неправильный формат почты',
    url: 'Неправильный формат ссылки',
  },
};