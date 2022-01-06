var express = require("express");
var logger = require("morgan");
var cookieParser = require("cookie-parser");

var app = express();

// middleware

app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static((__dirname + "/public" )))

app.use(cookieParser());

// pathname

app.use('/admin', (req, res, next) => {
  next('Unauthorised request');
});

// app.get("/", (req, res) => {
//   res.send("/ path");
// });

app.get("/users", (req, res) => {
  res.send("/users");
})


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/projects', (req, res) => {
  res.sendFile(__dirname + '/projects.html');
});


//error handling

app.use((req, res, next) => {
  res.status(404).send('This requested url is not found');
  next();
});

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

// listening

app.listen(4001, () => {
  console.log("listening at port 4k");
})