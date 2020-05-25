const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const events = require('./routes/api/events')

const app = express()

//body parser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(bodyParser.json());

//connect to db
const db = require('./config/keys').mongoURI;

//Connect to mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(()=>console.log('MongoDB connect bruh...'))
    .catch(err=>console.log(err));

//Use routes
app.use('/api/events', events);

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server start on port ${port}`));