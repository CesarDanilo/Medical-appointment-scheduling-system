const express = require('express');
const pool = require('./database/config/db');

const app = express();
const port = 3001;

app.use(express.json());
const routes = require("./routes/routes");

app.use(routes);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});