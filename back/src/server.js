const express = require('express');
const client = require('./config/db');
require('dotenv').config();

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('API está funcionando !')
});

app.get('/teste-banco', async (req, res) => {
    try {
        const result = await client.query('SELECT NOW()');
        res.json(result.rows)
    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', err);
        res.status(500).json({ error: 'Erro ao acessar o banco de dados' });
    }
});

app.listen(port, () => {
    console.log(`PORT rodando na porta ${port}`);
})