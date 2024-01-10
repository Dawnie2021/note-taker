const express = require('express');
const path = require('path');
const fs = require('fs');


const PORT = process.env.PORT ?? 3001; 


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

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
    res.json(`${req.method} request received to get notes`);
//log our request to the terminal 
    console.info(`${req.method} request received to get notes`);
});
 //post request to add a note
app.post('/api/notes', (req, res) => {
    //Log that a POST request was received
    console.info(`${req.method} request received to add a new note`);
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});