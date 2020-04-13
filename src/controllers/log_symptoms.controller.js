// Log Controller
//

const Log_Symptoms = require('../models/log_symptoms.model.js');

// Create and Save a new Log
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log(req.body);

  const newLog = new Log_Symptoms({
    User_Email: req.body.User_Email,
    Date: req.body.Date,
    Symptom_ID: req.body.Symptom_ID,
    Symptom_Intensity: req.body.Symptom_Intensity,
  });
  console.log(
    '%s,%s,%s,%s',
    newLog.User_Email,
    newLog.Date,
    newLog.Symptom_ID,
    newLog.Symptom_Intensity
  );

  // Save Log in the database
  Log_Symptoms.create(newLog, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    else res.send(data);
  });
};

// Find a single Log with a Email and Date
// Find requestes need to be surrounded by single tick 'email@gmail.com'
exports.getLog = (req, res) => {
  console.log('getLog - %s,%s', req.params.user_id, req.params.date);
  Log_Symptoms.getLog(req.params.user_id, req.params.Date, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No Log found with user ID ${req.params.user_id} and date ${req.params.date}.`,
        });
      } else {
        res.status(500).send({
          message:
            'Error retrieving Log with user ID ' +
            req.params.user_id +
            'and date' +
            req.params.date,
        });
      }
    } else res.send(data);
  });
};

// Retrieve all Logs from the database.
exports.getAllLogs = (req, res) => {
  console.log('getAllLogs - %s,%s', req.params.user_id, req.params.date);
  Log_Symptoms.getAllLogs(req.param.user_id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving logs.',
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  Log_Symptoms.update(
    req.params.user_id,
    req.params.date,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Log with user ID ${req.params.user_id} and date ${req.params.date}.`,
          });
        } else {
          res.status(500).send({
            message:
              'Error updating Log with user ID ' +
              req.params.user_id +
              'and date' +
              req.params.date,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Log with the specified Email in the request
// Any deletion requests should not have any 'ticks' around user_id key
exports.delete = (req, res) => {
  console.log(req.params.user_id);
  Log_Symptoms.remove(req.params.user_id, req.params.date, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with Email ${req.params.user_id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Log with Email ' + req.params.user_id,
        });
      }
    } else res.send({ message: `Log: was deleted successfully!` });
  });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  Log_Symptoms.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      });
    else res.send(data);
  });
};
