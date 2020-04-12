// Router
// Grant Stewart

module.exports = (app) => {
  const Log_BMI = require('../controllers/log_bmi.controller.js');

  // Create a new User
  app.post('/Log_BMI', Log_BMI.create);

  app.get('/Log_BMI', Log_BMI.findAll);

  // Retrieve all Logs from User
  app.get('/Log_BMI/:user_id', Log_BMI.getAllLogs);

  // Retrieve a single Log with user_id and date
  app.get('Log_BMI/:user_id/:date', Log_BMI.getLog);

  // Retrieve a single Log with user_id and date
  app.put('/Log_BMI/:user_id/:date', Log_BMI.update);

  // Delete a Log with user_id and date
  app.delete('/Log_BMI/:user_id/:date', Log_BMI.delete);
};
