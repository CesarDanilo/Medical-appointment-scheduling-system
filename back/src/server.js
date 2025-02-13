const express = require('express');
const pool = require('./database/config/db');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * from users');
    res.send(`${rows}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database connection failed');
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});