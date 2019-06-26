const express = require('express');

const bookRouter = express.Router();
const bookController = require('../controllers/bookController');
const bookService = require('../services/goodreadsService');

function router(nav) {
  const { getIndex, getById } = bookController(bookService, nav);
  bookRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });

  bookRouter.route('/')
    .get(getIndex);
  bookRouter.route('/:id')
    .get(getById);
  return bookRouter;
}


module.exports = router;
