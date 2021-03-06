// Log_BMI Controller
//

const Log_BMI = require('../models/log_bmi.model.js');

// Create and Save a new Log_BMI
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log(req.body);
  // Create a Log_BMI
  // JSON example of creating a log_bmi
  //  {
  //   "ID": 0,
  //   "Name": "Jeff Bean",
  //   "Password": "secret",
  //   "Phone_Number": 7775550000
  //  }

  const log_bmi = new Log_BMI({
    ID: req.body.ID,
    Email: req.body.Email,
    Name: req.body.Name,
    Password: req.body.Password,
    Phone_Number: req.body.Phone_Number,
  });
  console.log(
    '%s,%s,%s,%s,%s',
    log_bmi.ID,
    log_bmi.Email,
    log_bmi.Name,
    log_bmi.Password,
    log_bmi.Phone_Number
  );

  // Save Log_BMI in the database
  Log_BMI.create(log_bmi, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Log_BMI.',
      });
    else res.send(data);
  });
};

// Retrieve all Log_Feelingss from the database.
exports.findAll = (req, res) => {
  Log_BMI.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving log_feelingss.',
      });
    else res.send(data);
  });
};

// Find a single Log_BMI with a Email
// Find requestes need to be surrounded by single tick 'email@gmail.com'
exports.findLog_Feelings = (req, res) => {
  Log_BMI.findByID(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No Log_BMI found with ID ${req.params.id}.`,
        });
      } else {
        console.log('LOOK:', err);
        res.status(500).send({
          message: 'Error retrieving Log_BMI with ID ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Find a single Log_BMI with a Email
// Find requestes need to be surrounded by single tick 'email@gmail.com'
exports.findByIDAndDate = (req, res) => {
  Log_BMI.findByIDAndDate(req.params.id, req.params.date, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No Log_BMI found with ID ${req.params.id} and date ${req.params.date}.`,
        });
      } else {
        console.log('LOOK:', err);
        res.status(500).send({
          message:
            'Error retrieving Log_BMI with ID ' +
            req.params.id +
            ' and date ' +
            req.params.date,
        });
      }
    } else res.send(data);
  });
};

// Delete a Log_BMI with the specified ID in the request
// Any deletion requests should not have any 'ticks' around email key
exports.delete = (req, res) => {
  console.log(req.params.id);
  Log_BMI.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Log_BMI with ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Log_BMI with ID ' + req.params.id,
        });
      }
    } else res.send({ message: `Log_BMI was deleted successfully!` });
  });
};
