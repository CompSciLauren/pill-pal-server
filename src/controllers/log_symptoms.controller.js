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

  const log_symptoms = new Log_Symptoms({
    User_ID: req.body.User_ID,
    Date: req.body.Date,
    Symptom_ID: req.body.Symptom_ID,
    Symptom_Intensity: req.body.Symptom_Intensity,
  });

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
