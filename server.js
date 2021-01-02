const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const Sequelize = require('sequelize');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
// Database
const db = require('./models');
 
const PORT = process.env.PORT || 8000;
const app = express();
//const connection = require('./config/connection');


// Passport config
require('./config/passport')(passport);

// DB Config
const mdb = require('./config/keys').MongoURI;


// Connect to Mongo
mongoose.connect(mdb, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


// connection
//   .authenticate()
//   .then(() => console.log('Database connected...'))
//   .catch(err => console.log('Error: ' + err))

// Handlebars

app.engine('handlebars', exphbs({
  defaultLayout: 'layouts',
  layoutsDir:path.join(__dirname,'views/layouts'),
  partialsDir:path.join(__dirname,'views/partials'),
       runtimeOptions: {
           allowProtoPropertiesByDefault: true,
           allowProtoMethodsByDefault: true,
     },
  }));
app.set('view engine', 'handlebars');

// Body Parser
app.use(express.urlencoded({ extended: false}));
app.use(express.json());



// Express Session 
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Connect Flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Index route
app.get('/', (req, res) => res.render('home'));

//app.get('/add', (req, res) => res.render('add'));




// Doctors routes
app.use('/doctors', require('./routes/doctors'));
app.use('/api-doctors', require('./routes/api-doctors'));


app.use("/users", require("./routes/users"));


db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });