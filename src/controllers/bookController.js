const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

function bookController(bookService, nav) {
  function getIndex(req, res) {
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
  }
  function getById(req, res) {
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
        book.details = await bookService.getBookById(book.bookId);
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
  }

  // Revealing module pattern:
  // return object with functions in it
  return {
    getIndex,
    getById
  };
}

module.exports = bookController;
