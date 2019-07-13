const express = require('express');
const exphbs = require ('express-handlebars');
const methodOverride = require('method-override');
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method override middleware
app.use(methodOverride('_method'));

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

// Idea Index Page
app.get('/ideas', (request, response) => {
  Idea.find({})
    .sort({date:'desc'})
    .then(ideas => {
      response.render('ideas/index', {
        ideas:ideas
      });
    })
});

// Add Idea Form
app.get('/ideas/add', (request, response) => {
  response.render('ideas/add');
});

// Edit Idea Form: id represents a parameter
app.get('/ideas/edit/:id', (request, response) => {
  Idea.findOne({
    _id: request.params.id
  })
  .then(idea => {
    response.render('ideas/edit', {
      idea: idea
    })
  })
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
    const newUser = {
      title: request.body.title,
      details: request.body.details
    }
    new Idea(newUser)
      .save()
      .then(idea => {
        response.redirect('/ideas');
      })
  }
})

// Edit Form process
app.put('/ideas/:id', (req, res) => {
  res.send('PUT');
});

const port = 5000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});