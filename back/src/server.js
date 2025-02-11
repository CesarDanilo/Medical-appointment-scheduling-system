const express = require('express');
const pool = require('./config/db');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW()');
    res.send(`Database connection successful. Current time: ${rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database connection failed');
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});