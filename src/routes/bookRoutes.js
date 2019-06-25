const express = require('express');

const bookRouter = express.Router();
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);
          const col = await db.collection('books');
          const books = await col.find().toArray();
          debug(col.find().toArray());

          res.render(
            'bookListView',
            {
              nav,
              title: 'NodeCourse',
              books
            }
          );
        } catch (err) {
          debug(err.stack);
        }
      }());
    });


  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);
          const col = await db.collection('books');
          const book = await col.findOne({ _id: new ObjectID(id) });
          debug(book);
          res.render(
            'bookView',
            {
              nav,
              title: 'NodeCourse',
              book
            }
          );
        } catch (err) {
          debug(err.stack);
        }
      }());
    });
  return bookRouter;
}


module.exports = router;
