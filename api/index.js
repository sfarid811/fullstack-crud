const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const connectDB = require('./config/database');
const todoRoutes = require('./routes/todos');

//database connection

connectDB();
app.use(express.json());
app.use(cors());

app.get('/', function(req, res) {
    res.send('hello world');
  
  });

app.use('/api/todos', todoRoutes);

  
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`port is running on ${PORT}`);
})