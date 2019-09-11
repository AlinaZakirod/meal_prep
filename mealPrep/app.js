require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

//addition for user authentication:
const session = require("express-session");
const MongoStore   = require("connect-mongo")(session);
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash")


//Edamam API
const { RecipeSearchClient } = require('edamam-api');
 
const client = new RecipeSearchClient({
  appId: 'f8e66ec4',
  appKey: '9741c69dc99cb5c20165983a131f9890'
});
 
// const results = await client.search({ query: 'Bread' });
client.search({query: 'Bread'})
  .then()
  .catch()
  //_________________________

const User = require('./models/User');

mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


// express session configuration
app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

// passport configuration
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


//error messages:
app.use(flash());
passport.use(new LocalStrategy((username, password, next) => {
  User
  .findOne({ username }, (err, user) =>  {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));

//initialize passport and passport-sessions
app.use(passport.initialize());
app.use(passport.session());



// ________________________________________

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.errorMessage = req.flash('error')
  res.locals.successMessage = req.flash('success')
  next()
})

// default value for title local
app.locals.title = 'Welcome to Meal Plans!!! Bon A Petit!';


// require routes
app.use('/', require('./routes/user-routes'));
app.use('/', require('./routes/plan-routes'));
app.use('/', require('./routes/meal-routes'));
app.use('/', require('./routes/plan-api-routes'));


const index = require('./routes/index');
app.use('/', index);

module.exports = app;
