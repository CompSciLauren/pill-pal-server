// Router
// Grant Stewart

module.exports = (app) => {
  const Log_Symptoms = require('../controllers/log_symptoms.controller.js');

  // Create a new User
  app.post('/Log_Symptoms', Log_Symptoms.create);

  app.get('/Log_Symptoms', Log_Symptoms.findAll);

  // Retrieve all Logs from User
  app.get('/Log_Symptoms/:user_id', Log_Symptoms.getAllLogs);

  // Retrieve a single Log with user_id and date
  app.get('Log_Symptoms/:user_id/:date', Log_Symptoms.getLog);

  // Update a single Log with user_id and date
  app.put('/Log_Symptoms/:user_id/:date', Log_Symptoms.update);

  // Delete a Log with user_id and date
  app.delete('/Log_Symptoms/:user_id/:date', Log_Symptoms.delete);
};
