var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cookieParser());
console.log();

app.use('/admin', (req, re, next) => {
  next('Unauthorized to access');
});
app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});
app.use('/about', (req, res, next) => {
  res.cookie('username', 'reena');
  res.end('about page');
});

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send('<h2>Welcome to express</h2>');
});
app.get('/about', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('My name is reena');
});
app.get('/users/:username', (req, res) => {
  var username = req.params.username;
  res.send(username);
});
app.post('/form', (req, res) => {
  if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    res.json(req.body);
  }
});
app.post('/json', (req, res) => {
  if (req.headers['content-type'] === 'application/json') {
    res.send(JSON.stringify(req.body));
  }
});
app.use((req, res, next) => {
  res.send('Page not Found');
});
app.use((err, req, res, next) => {
  res.status(500).send(err);
});
app.listen(3000, () => {
  console.log('server listening onport 3k');
});