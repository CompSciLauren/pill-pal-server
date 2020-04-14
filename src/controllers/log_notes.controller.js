// Log_Notes Controller
//

const Log_Notes = require('../models/log_notes.model.js');

// Create and Save a new Log_Notes
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log(req.body);
  // Create a Log_Notes
  // JSON example of creating a log_notes
  //  {
  //   "ID": 0,
  //   "Name": "Jeff Bean",
  //   "Password": "secret",
  //   "Phone_Number": 7775550000
  //  }

  const log_notes = new Log_Notes({
    ID: req.body.ID,
    Email: req.body.Email,
    Name: req.body.Name,
    Password: req.body.Password,
    Phone_Number: req.body.Phone_Number,
  });
  console.log(
    '%s,%s,%s,%s,%s',
    log_notes.ID,
    log_notes.Email,
    log_notes.Name,
    log_notes.Password,
    log_notes.Phone_Number
  );

  // Save Log_Notes in the database
  Log_Notes.create(log_notes, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Log_Notes.',
      });
    else res.send(data);
  });
};

// Retrieve all Log_Notess from the database.
exports.findAll = (req, res) => {
  Log_Notes.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving log_notess.',
      });
    else res.send(data);
  });
};

// Find a single Log_Notes with a Email
// Find requestes need to be surrounded by single tick 'email@gmail.com'
exports.findLog_Notes = (req, res) => {
  Log_Notes.findByID(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No Log_Notes found with ID ${req.params.id}.`,
        });
      } else {
        console.log('LOOK:', err);
        res.status(500).send({
          message: 'Error retrieving Log_Notes with ID ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Find a single Log_Notes with a Email
// Find requestes need to be surrounded by single tick 'email@gmail.com'
exports.findByIDAndDate = (req, res) => {
  Log_Notes.findByIDAndDate(req.params.id, req.params.date, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No Log_Notes found with ID ${req.params.id} and date ${req.params.date}.`,
        });
      } else {
        console.log('LOOK:', err);
        res.status(500).send({
          message:
            'Error retrieving Log_Notes with ID ' +
            req.params.id +
            ' and date ' +
            req.params.date,
        });
      }
    } else res.send(data);
  });
};

// Delete a Log_Notes with the specified ID in the request
// Any deletion requests should not have any 'ticks' around email key
exports.delete = (req, res) => {
  console.log(req.params.id);
  Log_Notes.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Log_Notes with ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Log_Notes with ID ' + req.params.id,
        });
      }
    } else res.send({ message: `Log_Notes was deleted successfully!` });
  });
};
