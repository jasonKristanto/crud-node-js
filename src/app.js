const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');
const {connectDB} = require('./database/connection');

const app = express();
const port = 3000;

connectDB();

app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});