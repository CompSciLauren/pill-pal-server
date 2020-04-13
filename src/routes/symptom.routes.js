// Router
// Grant Stewart

module.exports = (app) => {
  const Symptom = require('../controllers/symptom.controller.js');

  // Create a new Symptom
  app.post('/Symptom', Symptom.create);

  // Retrieve all Symptoms
  app.get('/Symptom', Symptom.findAll);

  // Retrieve a single Customer with ID
  app.get('/Symptom/:id', Symptom.findSymptom);

  // Delete a Customer with ID
  app.delete('/Symptom/:id', Symptom.delete);
};
