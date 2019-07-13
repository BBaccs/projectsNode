const express = require('express');
const exphbs = require ('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-brian', {
  useNewUrlParser: true 
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Load Idea Model, we don't need idea.js, just idea will do.
require('./models/Idea'); 
const Idea = mongoose.model('ideas');

//Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'handlebars');

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

// Add Idea Form
app.get('/ideas/add', (request, response) => {
  response.render('ideas/add');
});

// Process Form
app.post('/ideas', (request, response) => {
  let errors = [];
  if (!request.body.title) {
    errors.push({text:'Please add a title'})
  }
  if (!request.body.details) {
    errors.push({text:'Please add some details'})
  }
  if(errors.length) {
    response.render('ideas/add', {
      errors: errors,
      title: request.body.title,
      details: request.body.details
    });
  } else {
    response.send('passed');
  }
})


const port = 5000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});