const express = require('express');

const bookRouter = express.Router();

function router(nav) {
  const books = [
    {
      title: 'Educated: A Memoir',
      genre: 'Biography',
      author: 'Tara Westover',
      read: false
    },
    {
      title: 'Educated: A Memoir',
      genre: 'Biography',
      author: 'Tara Westover',
      read: false
    },
    {
      title: 'Educated: A Memoir',
      genre: 'Biography',
      author: 'Tara Westover',
      read: false
    },
    {
      title: 'Educated: A Memoir',
      genre: 'Biography',
      author: 'Tara Westover',
      read: false
    }
  ];

  bookRouter.route('/')
    .get((req, res) => {
      res.render(
        'bookListView',
        {
          nav,
          title: 'NodeCourse',
          books
        }
      );
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render(
        'bookView',
        {
          nav,
          title: 'NodeCourse',
          book: books[id]
        }
      );
    });
  return bookRouter;
}


module.exports = router;
