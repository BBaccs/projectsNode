const express = require('express');
const exphbs = require ('express-handlebars');
const mongoose = require('mongoose');

const app = express();

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
app.set('view engine', 'handlebars');

// How middleware works
// app.use(function(request, response, next){
//   request.name = 'Brian Baccarella';
//   next();
// });

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

const port = 5000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});