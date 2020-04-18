const express = require('express');
const app = express();
const chalk = require('chalk');
const bodyParser = require('body-parser');
const port = process.env.port;

// initializing mongo connection
require('./config/mongoDb');

// adding global middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  if (req.method === 'GET' && req.path === '/') {
    res.sendStatus(200).end();
  }
  next();
  
});

app.listen(port, () => {
  console.log(chalk.green('Server started successfully: ', port));
});
