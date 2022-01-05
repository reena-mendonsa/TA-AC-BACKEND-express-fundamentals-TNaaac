var express = require('express');
var logger = require('morgan');
var app = express();

app.use('/admin', (req, re, next) => {
  next('Unauthorized to access');
});
app.get('/', (req, res) => {
  res.send('Welcome');
});
app.get('/about', (req, res) => {
  res.send('About');
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