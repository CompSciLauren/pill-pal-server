module.exports = (app) => {
  const Takes = require('../controllers/takes.controller.js');

  // Create a new Takes entry
  app.post('/Takes', Takes.create);

  // Retrieve all Takes info
  app.get('/Takes', Takes.findAll);

  // Retrieve a single Customer with user_id
  app.get('/Takes/:user_id', Takes.findMedication);

  // Delete one medication with user_id and name of medication
  app.delete('/Takes/:user_id/:medication_id', Takes.delete);

  // Delete all medications with user_id
  app.delete('/Takes/:user_id', Takes.deleteAll);
};
