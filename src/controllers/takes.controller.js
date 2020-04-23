const Takes = require('../models/takes.model.js');

// Create and Save a new Takes row
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  const takes = new Takes({
    User_ID: req.body.User_ID,
    Medication_ID: req.body.Medication_ID,
    Amount_Prescribed: req.body.Amount_Prescribed,
    Refills: req.body.Refills,
  });

  // Save User in the database
  Takes.create(takes, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    else res.send(data);
  });
};

exports.updatePill = (req, res) => {
  const takes = new Takes({
    User_ID: req.body.User_ID,
    Medication_ID: req.body.Medication_ID,
    Amount_Prescribed: req.body.Amount_Prescribed,
    Refills: req.body.Refills,
    Display_Name: req.body.Display_Name,
  });

  Takes.updatePill(
    takes.User_ID,
    takes.Medication_ID,
    takes.Amount_Prescribed,
    takes.Refills,
    takes.Display_Name,
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `No User found with ID ${req.params.user_id}.`,
          });
        } else {
          res.status(500).send({
            message:
              'Error retrieving User with ID ' +
              req.params.user_id +
              ' and medication ID ' +
              req.params.medication_id +
              ' and amount prescribed of ' +
              req.params.amount_prescribed +
              '. Err Code: ' +
              err,
          });
        }
      } else res.send(data);
    }
  );
};

// Find a single User's current medication via their user ID
// Find requests need to be surrounded by single tick 'email@gmail.com'
exports.findMedication = (req, res) => {
  Takes.findByUser_ID(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No User found with ID ${req.params.user_id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving User with ID ' + req.params.user_id,
        });
      }
    } else res.send(data);
  });
};

// Retrieve all Takes info from the database.
exports.findAll = (req, res) => {
  Takes.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving takes info.',
      });
    else res.send(data);
  });
};

// Delete one medication with the specified Email in the request
// Any deletion requests should not have any 'ticks' around email key
exports.delete = (req, res) => {
  Takes.remove(req.params.user_id, req.params.medication_id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with ID ${req.params.user_id} and Medication ID ${req.params.medication_id}.`,
        });
      } else {
        res.status(500).send({
          message:
            'Could not delete any medication for User with ID ' +
            req.params.user_id,
        });
      }
    } else
      res.send({ message: `A medication for User was deleted successfully!` });
  });
};

// Delete all medications with the specified Email in the request
// Any deletion requests should not have any 'ticks' around email key
exports.deleteAll = (req, res) => {
  Takes.removeAll(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with ID ${req.params.user_id}.`,
        });
      } else {
        res.status(500).send({
          message:
            'Could not delete medications for User with ID ' +
            req.params.user_id,
        });
      }
    } else
      res.send({
        message: `All medications for User were deleted successfully!`,
      });
  });
};
