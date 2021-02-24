const express = require('express');
const app = express();
const path = require('path');

// Middleware
app.use(express.json({ extended: false }));

//Routes
app.use('/api/books', require('./routes/books'));
app.use('/api/query', require('./routes/api'));
app.use('/api/auth', require('./routes/auth'));

//Static assest
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const server = process.env.PORT || 5000;

app.listen(server, () => {
  console.log(`Server is running on port:${server}`);
});
