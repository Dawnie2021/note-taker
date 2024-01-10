const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const PORT = process.env.PORT ?? 3001;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/notes.html'));
});


app.get('/api/notes', (req, res) => {  
    const data = (fs.readFileSync('./db/db.json', 'utf-8'));
    const notes = data ? JSON.parse(data) : [];
    res.json(notes);
});


app.post('/api/notes', (req, res) => {
    const data = (fs.readFileSync('./db/db.json', 'utf-8'));
    const notes = data ? JSON.parse(data) : [];
    notes.push({...req.body, id: uuidv4()});
    const notesStr = JSON.stringify(notes, null, 2);
    fs.writeFileSync('./db/db.json', notesStr);
        res.json(req.body);
   
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});