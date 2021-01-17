const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan =require ('morgan');
const path =require('path');
const cors =require( 'cors');
const config =require( './config');
const decodeIDToken = require('./middleware/auth');

const items = require('./routes/api/items');
const events = require('./routes/api/events');
const users = require("./routes/api/users");
const authRoutes = require("./routes/api/auth");
const purchases = require('./routes/api/purchases')
const organizations = require('./routes/api/organizations')

const { MONGO_URI, MONGO_DB_NAME } = config;

const app = express();


app.use(bodyParser.json());

// CORS Middleware
app.use(cors());
// Logger Middleware
app.use(morgan('dev'));
//body parser middleware
// app.use(
//     bodyParser.urlencoded({
//       extended: false
//     })
//   );
app.use(decodeIDToken);

//connect to db
const db = `${MONGO_URI}/${MONGO_DB_NAME}`;


//Connect to mongo
mongoose
  .connect(db, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useFindAndModify: false
    })
    .then(()=>console.log('MongoDB connect bruh...'))
    .catch(err=>console.log(err));

// Routes
// app.use("/api/users", users);
app.use('/api/events', events);
app.use('/api/auth', authRoutes);
app.use('/api/items', items);
app.use('/api/purchases', purchases);
app.use('/api/organizations', organizations);



const { PORT } = config;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}