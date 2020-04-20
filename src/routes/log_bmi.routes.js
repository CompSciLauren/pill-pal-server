// Router
// Grant Stewart

module.exports = (app) => {
  const Log_BMI = require('../controllers/log_bmi.controller.js');

  // Create a new Log_BMI
  app.post('/Log_BMI', Log_BMI.create);

  // Retrieve all Log_Feelingss
  app.get('/Log_BMI', Log_BMI.findAll);

  // Retrieve a single Customer with ID
  app.get('/Log_BMI/:id', Log_BMI.findLog_Feelings);

  // Retrieve user's feelings for a specific day
  app.get('/Log_BMI/:id/:date', Log_BMI.findByIDAndDate);

  // Delete a Customer with ID
  app.delete('/Log_BMI/:id', Log_BMI.delete);
};
