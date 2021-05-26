const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const { connectDB } = require('./database/connection');

const server = express();
const port = 3000;

connectDB();

server.use(bodyParser.json());
server.use('/', routes);

server.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
