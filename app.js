var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieSession = require('cookie-session')
var config = require('./config')

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(config.db);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//mongoose.connect(config.db, {useNewUrlParser: true})

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function(){
  console.log('db connection ok')
})



var indexRouter = require('./routes/index');
var newsRouter = require('./routes/news');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  keys: config.keySession,
  maxAge: config.maxAgeSession // 24 hours
}))


app.use(function(req, res , next){

  res.locals.path = req.path

  next()

})


app.use('/', indexRouter);
app.use('/news', newsRouter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
