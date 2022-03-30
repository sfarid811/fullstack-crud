const express = require('express');
const app = express();
const config = require('dotenv').config();
const connectDB = require('./config/database');


//database connection

connectDB();


app.get('/', function(req, res) {
    res.send('hello world');
    console.log(process.env.MONGODB_URI, 'test')
  });

  
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`port is running on ${PORT}`);
})