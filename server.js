const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));



app.get('/api/notes', (req, res) =>{
    fs.readFile("./db/db.json","utf8",(err, data)=>{
        if (err) throw err;
        console.log(data);
        const noted = JSON.parse(data);
        console.log(noted);
        res.status(200).json(noted);
    })
});

app.post('/api/notes', (req, res) => {
    console.log(req.body)
    const newnote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
}
    console.log(newnote);
    fs.readFile("./db/db.json","utf8",(err, data)=>{
        if (err) throw err;
        const noted = JSON.parse(data);
        noted.push(newnote)
        console.log(noted);
        fs.writeFile('./db/db.json', JSON.stringify(noted),(err)=>{
            if (err) throw err;
            res.status(200).json(noted);
        })
    })
});

// DELETE/api/notes/:id 
app.delete('/api/notes/:id', (req, res) => {
     
    const id = parseInt(req.params.id);
    console.log(id);
    const noteToDelete = notes.find(el => el.id === id);
    const notesIndex = notes.indexOf(noteToDelete);

    notes.splice(notesIndex, 1);
    fs.writeFile('./db/db.json', JSON.stringify(notes),(err)=>{
        if (err) throw err;
       return res.status(200).send();
            
        })
});

// This view route is a GET route for the homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// This view route is a GET route for the notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);