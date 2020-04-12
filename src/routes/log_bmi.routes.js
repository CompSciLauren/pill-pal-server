// Router
// Grant Stewart

module.exports = (app) => {
  const Log_BMI = require('../controllers/log_bmi.controller.js');

  // Create a new User
  app.post('/Log_BMI', Log_BMI.create);

  app.get('/Log_BMI', Log_BMI.findAll);

  // Retrieve all Logs from User
  app.get('/Log_BMI/:email', Log_BMI.getAllLogs);

  // Retrieve a single Log with email and date
  app.get('Log_BMI/:email/:date', Log_BMI.getLog);

  // Retrieve a single Log with email and date
  app.put('/Log_BMI/:email/:date', Log_BMI.update);

  // Delete a Log with email and date
  app.delete('/Log_BMI/:email/:date', Log_BMI.delete);
};
