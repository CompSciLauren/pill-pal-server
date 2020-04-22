// Log_Feelings Controller
//

const Log_Feelings = require('../models/log_feelings.model.js');

// Create and Save a new Log_Feelings
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log(req.body);
  // Create a Log_Feelings
  // JSON example of creating a log_feelings
  //  {
  //   "ID": 0,
  //   "Name": "Jeff Bean",
  //   "Password": "secret",
  //   "Phone_Number": 7775550000
  //  }

  const log_feelings = new Log_Feelings({
    User_ID: req.body.User_ID,
    Date: req.body.Date,
    Feeling_ID: req.body.Feeling_ID,
    Feeling_Intensity: req.body.Feeling_Intensity,
  });
  console.log(
    '%s,%s,%s,%s',
    log_feelings.User_ID,
    log_feelings.Date,
    log_feelings.Feeling_ID,
    log_feelings.Feeling_Intensity
  );

  // Save Log_Feelings in the database
  Log_Feelings.create(log_feelings, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Log_Feelings.',
      });
    else res.send(data);
  });
};

// Retrieve all Log_Feelingss from the database.
exports.findAll = (req, res) => {
  Log_Feelings.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving log_feelingss.',
      });
    else res.send(data);
  });
};

// Find a single Log_Feelings with a Email
// Find requestes need to be surrounded by single tick 'email@gmail.com'
exports.findLog_Feelings = (req, res) => {
  Log_Feelings.findByID(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No Log_Feelings found with ID ${req.params.id}.`,
        });
      } else {
        console.log('LOOK:', err);
        res.status(500).send({
          message: 'Error retrieving Log_Feelings with ID ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Find a single Log_Feelings with a Email
// Find requestes need to be surrounded by single tick 'email@gmail.com'
exports.findByIDAndDate = (req, res) => {
  Log_Feelings.findByIDAndDate(req.params.id, req.params.date, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No Log_Feelings found with ID ${req.params.id} and date ${req.params.date}.`,
        });
      } else {
        console.log('LOOK:', err);
        res.status(500).send({
          message:
            'Error retrieving Log_Feelings with ID ' +
            req.params.id +
            ' and date ' +
            req.params.date,
        });
      }
    } else res.send(data);
  });
};

// Delete a Log_Feelings with the specified ID in the request
// Any deletion requests should not have any 'ticks' around email key
exports.delete = (req, res) => {
  console.log(req.params.id);
  Log_Feelings.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Log_Feelings with ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Log_Feelings with ID ' + req.params.id,
        });
      }
    } else res.send({ message: `Log_Feelings was deleted successfully!` });
  });
};
