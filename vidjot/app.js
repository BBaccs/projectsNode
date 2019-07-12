const express = require('express');

const app = express();

// How middleware works
app.use(function(request, response, next){
  // console.log(Date.now());
  request.name = 'Brian Baccarella';
  next();
});

//Index Route
app.get('/', (request, response) => {
  console.log(request.name);
  response.send(request.name);
});

//About Route
app.get('/about', (request, response) => {
  response.send('This is an about page');
});

const port = 5000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});