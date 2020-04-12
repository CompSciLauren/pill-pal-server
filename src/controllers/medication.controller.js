// Medication Controller
//

const Medication = require('../models/medication.model.js');

// Create and Save a new Medication
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log(req.body);
  // Create a Medication
  // JSON example of creating a medication
  //  {
  //   "ID": 0,
  //   "Name": "Jeff Bean",
  //   "Password": "secret",
  //   "Phone_Number": 7775550000
  //  }

  const medication = new Medication({
    ID: req.body.ID,
    Email: req.body.Email,
  });
  console.log(
    '%s,%s',
    medication.ID,
    medication.Email,
  );

// Retrieve all Medications from the database.
exports.findAll = (req, res) => {
  Medication.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving medications.',
      });
    else res.send(data);
  });
};

// Find a single Medication with a Email
// Find requestes need to be surrounded by single tick 'email@gmail.com'
exports.findMedication = (req, res) => {
  console.log('look:', req.params.id);
  Medication.findByID(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No Medication found with ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Medication with ID ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};