let express = require('express');
let qs = require('qs');
let fs = require('fs');
let app = express();
let currentTime = new Date().toLocaleTimeString('en-GB', {
  hour: 'numeric',
  minute: 'numeric',
});

function logger(req, res, next) {
  console.log(req.method, req.url, currentTime);
  next();
}
app.use('/log', logger);
function expressJson(req, res, next) {
  let store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    res.body = JSON.parse(store);
    console.log(res.body);
    res.end();
  });
}

function expressStatic(req, res, next) {
  if (req.url === '/') {
    console.log(req.method);
    fs.createReadStream('./index.html').pipe(res);
  } else if (req.url === '/blog.html') {
    console.log(req.method);
    fs.createReadStream('./blog.html').pipe(res);
  } else if (req.url.split('.').pop() === 'css') {
    // set header for css file
    res.setHeader('Content-Type', 'text/css');
    // read css file and send it in response
    fs.readFile(__dirname + '/public' + req.url, (err, content) => {
      if (err) return console.log(err);
      res.end(content);
    });
  } else if (req.url.split('.').pop() === 'jpg') {
    // set header for css file
    res.setHeader('Content-Type', 'image/jpg');
    // read css file and send it in response
    fs.readFile(__dirname + '/public' + req.url, (err, content) => {
      if (err) return console.log(err);
      res.end(content);
    });
  } else if (req.url.split('.').pop() === 'png') {
    // set header for css file
    res.setHeader('Content-Type', 'image/jpg');
    // read css file and send it in response
    fs.readFile(__dirname + '/public' + req.url, (err, content) => {
      if (err) return console.log(err);
      res.end(content);
    });
  } else if (req.url.split('.').pop() === 'js') {
    // set header for css file
    res.setHeader('Content-Type', 'text/javascript');
    // read css file and send it in response
    fs.readFile(__dirname + '/public' + req.url, (err, content) => {
      if (err) return console.log(err);
      res.end(content);
    });
  }
}

app.use('/', expressStatic);

app.post('/json', expressJson);

app.listen(3000, () => {
  console.log('server is listening to the port 3k');
});