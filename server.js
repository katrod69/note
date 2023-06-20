const express = require('express');
const path = require('path');
const fs = require('fs');
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
        const noted = JSON.parse(data)
        console.log(noted)
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