// Router
// Grant Stewart

module.exports = (app) => {
  const Log_Pills = require('../controllers/log_pills.controller.js');

  // Create a new Log_Pills
  app.post('/Log_Pills', Log_Pills.create);

  // Retrieve all Log_Pillss
  app.get('/Log_Pills', Log_Pills.findAll);

  // Retrieve a single Customer with ID
  app.get('/Log_Pills/:user_id', Log_Pills.findLog_Pills);

  // Retrieve user's feelings for a specific day
  app.get('/Log_Pills/:user_id/:datetime', Log_Pills.findByIDAndDatetime);

  // Delete a Customer with ID
  app.delete('/Log_Pills/:user_id', Log_Pills.delete);
};
