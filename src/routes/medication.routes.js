// Router
// Grant Stewart

module.exports = (app) => {
  const Medication = require('../controllers/medication.controller.js');

  // Create a new Medication
  app.post('/Medication', Medication.create);

  // Retrieve all Medications
  app.get('/Medication', Medication.findAll);

  // Retrieve a single Customer with ID
  app.get('/Medication/:id', Medication.findMedication);

  // Delete a Customer with ID
  app.delete('/Medication/:id', Medication.delete);
};
