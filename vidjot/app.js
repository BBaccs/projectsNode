const express = require('express');
const exphbs = require ('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Load routes
const ideas = require('./routes/ideas');

//Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-brian', {
  useNewUrlParser: true 
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

//Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method override middleware
app.use(methodOverride('_method'));

app.set('view engine', 'handlebars');

// Express session middleware
app.use(session({ 
  secret: 'secret', 
  resave: true,
  saveUninitialized: true,
}));

app.use(flash());

// Global variables
app.use(function(request, response, next){
  response.locals.success_msg = request.flash('success_msg');
  response.locals.error_msg = request.flash('error_msg');
  response.locals.error = request.flash('error');
  next();
});

//Index Route
app.get('/', (request, response) => {
  const title = 'Welcome to my first node.js app'
  response.render('index', {
    title: title
  });
});

//About Route
app.get('/about', (request, response) => {
  response.render('about');
});

// User Login Route
app.get('/users/login', (request, response) => {
  response.send('login');
})

// User Register Route
app.get('/users/register', (request, response) => {
  response.send('register');
})

// Use routes
app.use('/ideas', ideas);

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});