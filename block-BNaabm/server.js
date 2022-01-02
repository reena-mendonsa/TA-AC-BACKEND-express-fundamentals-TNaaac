let express = require('express');

let app = express();

function logger(req, res, next) {
  console.log(req.method, req.url);
  next();
}

app.use('/', logger);

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.listen(4000, () => {
  console.log('server is listening to the port 4k');
});