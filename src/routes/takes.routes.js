module.exports = app => {
  const Takes = require('../controllers/takes.controller.js');

  // Retrieve a single Customer with email
  app.get('/Takes/:email', Takes.findMedication);
};
