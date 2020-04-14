// Router
// Grant Stewart

module.exports = (app) => {
  const Log_Notes = require('../controllers/log_notes.controller.js');

  // Create a new Log_Notes
  app.post('/Log_Notes', Log_Notes.create);

  // Retrieve all Log_Notess
  app.get('/Log_Notes', Log_Notes.findAll);

  // Retrieve a single Customer with ID
  app.get('/Log_Notes/:id', Log_Notes.findLog_Notes);

  // Retrieve user's feelings for a specific day
  app.get('/Log_Notes/:id/:date', Log_Notes.findByIDAndDate);

  // Delete a Customer with ID
  app.delete('/Log_Notes/:id', Log_Notes.delete);
};
