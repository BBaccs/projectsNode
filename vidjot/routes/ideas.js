const express = require('express');
const router = express.Router();

// Idea Index Page
router.get('/', (request, response) => {
  Idea.find({})
    .sort({date:'desc'})
    .then(ideas => {
      response.render('ideas/index', {
        ideas:ideas
      });
    })
});

// Add Idea Form
router.get('/add', (request, response) => {
  response.render('ideas/add');
});

// Edit Idea Form: id represents a parameter
router.get('/edit/:id', (request, response) => {
  Idea.findOne({
    _id: request.params.id
  })
  .then(idea => {
    response.render('/edit', {
      idea: idea
    })
  })
});

// Add Process Form
router.post('/', (request, response) => {
  let errors = [];
  if (!request.body.title) {
    errors.push({text:'Please add a title'})
  }
  if (!request.body.details) {
    errors.push({text:'Please add some details'})
  }
  if(errors.length) {
    response.render('/add', {
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
        request.flash('success_msg', 'Video idea added');
        response.redirect('/');
      })
  }
})

// Edit Form process
router.put('/:id', (request, response) => {
  Idea.findOne({
    _id: request.params.id
  })
  .then(idea => {
    // New values
    idea.title = request.body.title;
    idea.details = request.body.details;

    idea.save()
      .then(idea => {
        request.flash('success_msg', 'Video idea updated');
        response.redirect('');
      })
  });
});

// Delete Idea
router.delete('/:id', (request, response) => {
  Idea.remove({_id: request.params.id})
    .then(() => {
      request.flash('success_msg', 'Video idea removed');
      response.redirect('/');
    });
});

module.exports = router;