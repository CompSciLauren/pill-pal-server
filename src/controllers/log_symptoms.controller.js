// Log_Symptoms Controller
//

const Log_Symptoms = require('../models/log_symptoms.model.js');

// Create and Save a new Log_Symptoms
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log(req.body);
  // Create a Log_Symptoms
  // JSON example of creating a log_symptoms
  //  {
  //   "ID": 0,
  //   "Name": "Jeff Bean",
  //   "Password": "secret",
  //   "Phone_Number": 7775550000
  //  }

  const log_symptoms = new Log_Symptoms({
    ID: req.body.ID,
    Email: req.body.Email,
    Name: req.body.Name,
    Password: req.body.Password,
    Phone_Number: req.body.Phone_Number,
  });
  console.log(
    '%s,%s,%s,%s,%s',
    log_symptoms.ID,
    log_symptoms.Email,
    log_symptoms.Name,
    log_symptoms.Password,
    log_symptoms.Phone_Number
  );

  // Save Log_Symptoms in the database
  Log_Symptoms.create(log_symptoms, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Log_Symptoms.',
      });
    else res.send(data);
  });
};

// Retrieve all Log_Symptomss from the database.
exports.findAll = (req, res) => {
  Log_Symptoms.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving log_symptomss.',
      });
    else res.send(data);
  });
};

// Find a single Log_Symptoms with a Email
// Find requestes need to be surrounded by single tick 'email@gmail.com'
exports.findByID = (req, res) => {
  Log_Symptoms.findByID(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No Log_Symptoms found with ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Log_Symptoms with ID ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Find a single Log_Symptoms with a Email
// Find requestes need to be surrounded by single tick 'email@gmail.com'
exports.findByIDAndDate = (req, res) => {
  Log_Symptoms.findByIDAndDate(req.params.id, req.params.date, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No Log_Symptoms found with ID ${req.params.id} and date ${req.params.date}.`,
        });
      } else {
        res.status(500).send({
          message:
            'Error retrieving Log_Symptoms with ID ' +
            req.params.id +
            ' and date ' +
            req.params.date,
        });
      }
    } else res.send(data);
  });
};

// Delete a Log_Symptoms with the specified ID in the request
// Any deletion requests should not have any 'ticks' around email key
exports.delete = (req, res) => {
  console.log(req.params.id);
  Log_Symptoms.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Log_Symptoms with ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Log_Symptoms with ID ' + req.params.id,
        });
      }
    } else res.send({ message: `Log_Symptoms was deleted successfully!` });
  });
};
