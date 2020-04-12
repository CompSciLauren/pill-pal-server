// Router
// Grant Stewart

module.exports = (app) => {
  const Medication = require('../controllers/medication.controller.js');

  // Retrieve all Medications
  app.get('/Medication', Medication.findAll);

  // Retrieve a single Customer with ID
  app.get('/Medication/:id', Medication.findMedication);
};
