const express = require('express');
const path = require('path');
const fs = require('fs');
const dataBase = require('./db.json')

const PORT = process.env.PORT ?? 3001; 

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

// app.get('/api/dataBase', (req, res) => res.json(dataBase));
 


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});