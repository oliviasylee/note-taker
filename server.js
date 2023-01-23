const express = require('express');
const path = require('path');

const apiRoutes = require('./routes/apiRoutes')

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use(express.static('public'));
app.use('/api ', apiRoutes);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// arrow function -> express middleware 
// This will match any request that doesn't match any of the other routes you have defined, and it will send the 'public/index.html' file as a response.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
  });

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);