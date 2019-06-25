const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');


// instance of express
const app = express();
const port = process.env.PORT || 3000;

const nav = [
  { link: '/books', title: 'Book' },
  { link: '/authors', title: 'Author' }];

const bookRouter = require('./src/routes/bookRoutes')(nav);

app.use(morgan('tiny'));
// set up static directory to use for static files (css or js)
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

// set views directory on application instance
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);

app.get('/', (req, res) => {
  res.render('index', {
    nav: [
      { link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' }],
    title: 'NodeCourse'
  });
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
