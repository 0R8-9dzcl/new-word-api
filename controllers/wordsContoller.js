const Word = require('../models/word'); // импорт схемы
// импорт ошибок
const BadReqError = require('../errors/BadReqError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const errMess = require('../utils/errMess');
const { log } = require('winston');

module.exports.getWords = (req, res, next) => {
  Word.find({ owner: req.user._id })
    .then((words) => res.status(200).send({ words }))
    .catch(next);
};

module.exports.postWord = (req, res, next) => {
  const { word, meaning, example, image } = req.body;
  const owner = req.user._id;
  Word.create({ word, meaning, example, image, owner })
    .then((word) => res.status(201).send({ word }))
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadReqError(errMess.badReq.createWord));
      next(err);
    });
};

module.exports.deleteWord = (req, res, next) => {
  Word.findById(req.params.wordId)
    .then((word) => {
      if (!word) throw new NotFoundError(errMess.notFound.wordById);
      if (word.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError(errMess.forbid.notOwn);
      }
      console.log(word);
      return word.remove()
        .then(() => res.status(200).send({ message: 'Слово успешно удалено.' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new BadReqError(errMess.badReq.wordDelete));
      console.log(err);
      next(err);
    });
};

module.exports.patchWord = (req, res, next) => {
  const { word, meaning, example, image } = req.body;
  console.log(req.params);
  Word.findByIdAndUpdate(req.params.wordId,
    { word, meaning, example, image }, 
    { new: true, runValidators: true },
    )
    .then((word) => {
      if(!word) throw new NotFoundError(errMess.notFound.wordById)
      res.status(200).send({ word });
    })
    .catch(err => {
      if (err.name === 'ValidationError') next(new BadReqError(errMess.badReq.updateWord));
      if (err.name === 'CastError') next(new BadReqError(errMess.badReq.updateWord));
      next(err)
    });

}