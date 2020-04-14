// Log_Pills Controller
//

const Log_Pills = require('../models/log_pills.model.js');

// Create and Save a new Log_Pills
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log(req.body);
  // Create a Log_Pills
  // JSON example of creating a log_pills
  //  {
  //   "ID": 0,
  //   "Name": "Jeff Bean",
  //   "Password": "secret",
  //   "Phone_Number": 7775550000
  //  }

  const log_pills = new Log_Pills({
    User_ID: req.body.User_ID,
    Medication_ID: req.body.Medication_ID,
    Datetime: req.body.Datetime,
    Amount: req.body.Amount,
    Taken: req.body.Taken,
  });

  // Save Log_Pills in the database
  Log_Pills.create(log_pills, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Log_Pills.',
      });
    else res.send(data);
  });
};

// Retrieve all Log_Pillss from the database.
exports.findAll = (req, res) => {
  Log_Pills.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving log_pillss.',
      });
    else res.send(data);
  });
};

// Find a single Log_Pills with a Email
// Find requestes need to be surrounded by single tick 'email@gmail.com'
exports.findLog_Pills = (req, res) => {
  Log_Pills.findByID(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No Log_Pills found with User ID ${req.params.user_id}.`,
        });
      } else {
        console.log('LOOK:', err);
        res.status(500).send({
          message:
            'Error retrieving Log_Pills with User ID ' + req.params.user_id,
        });
      }
    } else res.send(data);
  });
};

// Find a single Log_Pills with a Email
// Find requestes need to be surrounded by single tick 'email@gmail.com'
exports.findByIDAndDate = (req, res) => {
  Log_Pills.findByIDAndDate(
    req.params.user_id,
    req.params.date,
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `No Log_Pills found with User ID ${req.params.user_id} and date ${req.params.date}.`,
          });
        } else {
          console.log('LOOK:', err);
          res.status(500).send({
            message:
              'Error retrieving Log_Pills with User ID ' +
              req.params.user_id +
              ' and date ' +
              req.params.date,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Log_Pills with the specified ID in the request
// Any deletion requests should not have any 'ticks' around email key
exports.delete = (req, res) => {
  console.log(req.params.user_id);
  Log_Pills.remove(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Log_Pills with User ID ${req.params.user_id}.`,
        });
      } else {
        res.status(500).send({
          message:
            'Could not delete Log_Pills with User ID ' + req.params.user_id,
        });
      }
    } else res.send({ message: `Log_Pills was deleted successfully!` });
  });
};
