const express = require('express');
const app = express();

// Middleware
app.use(express.json({ extended: false }));

//Routes
app.use('/books', require('./routes/books'));
app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth'));

const server = process.env.PORT || 5000;

app.listen(server, () => {
  console.log(`Server is running on port:${server}`);
});
