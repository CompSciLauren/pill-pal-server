// Symptom Controller
//

const Symptom = require('../models/symptom.model.js');

// Create and Save a new Symptom
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log(req.body);
  // Create a Symptom
  // JSON example of creating a symptom
  //  {
  //   "ID": 0,
  //   "Name": "Jeff Bean",
  //   "Password": "secret",
  //   "Phone_Number": 7775550000
  //  }

  const symptom = new Symptom({
    ID: req.body.ID,
    Email: req.body.Email,
    Name: req.body.Name,
    Password: req.body.Password,
    Phone_Number: req.body.Phone_Number,
  });
  console.log(
    '%s,%s,%s,%s,%s',
    symptom.ID,
    symptom.Email,
    symptom.Name,
    symptom.Password,
    symptom.Phone_Number
  );

  // Save Symptom in the database
  Symptom.create(symptom, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Symptom.',
      });
    else res.send(data);
  });
};

// Retrieve all Symptoms from the database.
exports.findAll = (req, res) => {
  Symptom.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving symptoms.',
      });
    else res.send(data);
  });
};

// Find a single Symptom with a Email
// Find requestes need to be surrounded by single tick 'email@gmail.com'
exports.findSymptom = (req, res) => {
  Symptom.findByID(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No Symptom found with ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Symptom with ID ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Symptom with the specified ID in the request
// Any deletion requests should not have any 'ticks' around email key
exports.delete = (req, res) => {
  console.log(req.params.id);
  Symptom.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Symptom with ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Symptom with ID ' + req.params.id,
        });
      }
    } else res.send({ message: `Symptom was deleted successfully!` });
  });
};
