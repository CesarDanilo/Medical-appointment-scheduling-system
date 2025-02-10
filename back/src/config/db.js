const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    host: db,
    port: 5432,
    user: 'postgres',
    password: process.env.PG_PASSWORD,
    database: 'postgres'
});

client.connect()
    .then(() => console.log('Conectado ao banco de dados PostgreSQL'))
    .catch((err) => console.error('Erro ao conectar ao PostgreSQL', err));


module.exports = client;