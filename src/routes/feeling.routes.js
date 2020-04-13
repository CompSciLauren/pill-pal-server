// Router
// Grant Stewart

module.exports = (app) => {
  const Feeling = require('../controllers/feeling.controller.js');

  // Create a new Feeling
  app.post('/Feeling', Feeling.create);

  // Retrieve all Feelings
  app.get('/Feeling', Feeling.findAll);

  // Retrieve a single Customer with ID
  app.get('/Feeling/:id', Feeling.findFeeling);

  // Delete a Customer with ID
  app.delete('/Feeling/:id', Feeling.delete);
};
