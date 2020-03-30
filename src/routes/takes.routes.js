module.exports = app => {
  const Takes = require('../controllers/takes.controller.js');

  // Create a new Takes entry
  app.post('/Takes', Takes.create);

  // Retrieve all Takes info
  app.get('/Takes', Takes.findAll);

  // Retrieve a single Customer with email
  app.get('/Takes/:email', Takes.findMedication);

  // Delete one medication with email and name of medication
  app.delete('/Takes/:email/:medication', Takes.delete);

  // Delete all medications with email
  app.delete('/Takes/:email', Takes.deleteAll);
};
