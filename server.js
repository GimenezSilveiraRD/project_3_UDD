const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.get('/data', async (req, res) => {
    const API_KEY = 'HP37S5OA9UFDHW39';
    const SYMBOL = 'IBM';
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${SYMBOL}&interval=5min&apikey=${API_KEY}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener datos de Alpha Vantage:', error.message);
        res.status(500).send('Error al obtener datos');
    }
});

app.use(express.static('public'));
app.use(cors());

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
