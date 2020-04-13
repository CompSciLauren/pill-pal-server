// Router
// Grant Stewart

module.exports = (app) => {
  const Log_Symptoms = require('../controllers/log_symptoms.controller.js');

  // Create a new Log_Symptoms
  app.post('/Log_Symptoms', Log_Symptoms.create);

  // Retrieve all Log_Symptomss
  app.get('/Log_Symptoms', Log_Symptoms.findAll);

  // Retrieve a single Customer with ID
  app.get('/Log_Symptoms/:id', Log_Symptoms.findByID);

  // Delete a Customer with ID
  app.delete('/Log_Symptoms/:id', Log_Symptoms.delete);
};
