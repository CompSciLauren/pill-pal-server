// Router
// Grant Stewart

module.exports = (app) => {
  const Log_Feelings = require('../controllers/log_feelings.controller.js');

  // Create a new Log_Feelings
  app.post('/Log_Feelings', Log_Feelings.create);

  // Retrieve all Log_Feelingss
  app.get('/Log_Feelings', Log_Feelings.findAll);

  // Retrieve a single Customer with ID
  app.get('/Log_Feelings/:id', Log_Feelings.findLog_Feelings);

  // Delete a Customer with ID
  app.delete('/Log_Feelings/:id', Log_Feelings.delete);
};
