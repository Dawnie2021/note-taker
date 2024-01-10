const express = require('express');
const path = require('path');
const fs = require('fs');


const PORT = process.env.PORT ?? 3001;
const app = express();

//added middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/notes.html'));
});

//GET request for notes
app.get('/api/notes', (req, res) => {  
    //send message to client 
    const data = (fs.readFileSync('./db/db.json', 'utf-8'));
    const notes = data ? JSON.parse(data) : [];
    res.json(notes);
});

//POST request to add a note
app.post('/api/notes', (req, res) => {
    const data = (fs.readFileSync('./db/db.json', 'utf-8'));
    const notes = data ? JSON.parse(data) : [];
    notes.push(req.body);
    const notesStr = JSON.stringify(notes, null, 2);
    fs.writeFileSync('./db/db.json', notesStr);
        res.json(req.body);
   
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});