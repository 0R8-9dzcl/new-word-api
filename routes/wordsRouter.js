const wordsRouter = require('express').Router();
// импрот контроллеров
const {
  getWords,
  postWord,
  deleteWord,
  patchWord,
} = require('../controllers/wordsContoller');
// импорт валидаторов
const {
  postWordValidator,
  deleteWordValidator,
  patchWordValidator,
} = require('../middlewares/validator');

wordsRouter.get('/', getWords);
wordsRouter.post('/', postWordValidator, postWord);
wordsRouter.patch('/:wordId', patchWordValidator, patchWord);
wordsRouter.delete('/:wordId', deleteWordValidator, deleteWord);
// экпорт роутера
module.exports = wordsRouter;
