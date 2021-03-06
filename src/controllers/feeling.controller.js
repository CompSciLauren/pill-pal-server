// Feeling Controller
//

const Feeling = require('../models/feeling.model.js');

// Create and Save a new Feeling
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log(req.body);
  // Create a Feeling
  // JSON example of creating a feeling
  //  {
  //   "ID": 0,
  //   "Name": "Jeff Bean",
  //   "Password": "secret",
  //   "Phone_Number": 7775550000
  //  }

  const feeling = new Feeling({
    ID: req.body.ID,
    Email: req.body.Email,
    Name: req.body.Name,
    Password: req.body.Password,
    Phone_Number: req.body.Phone_Number,
  });
  console.log(
    '%s,%s,%s,%s,%s',
    feeling.ID,
    feeling.Email,
    feeling.Name,
    feeling.Password,
    feeling.Phone_Number
  );

  // Save Feeling in the database
  Feeling.create(feeling, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Feeling.',
      });
    else res.send(data);
  });
};

// Retrieve all Feelings from the database.
exports.findAll = (req, res) => {
  Feeling.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving feelings.',
      });
    else res.send(data);
  });
};

// Find a single Feeling with a Email
// Find requestes need to be surrounded by single tick 'email@gmail.com'
exports.findFeeling = (req, res) => {
  Feeling.findByID(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No Feeling found with ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Feeling with ID ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Feeling with the specified ID in the request
// Any deletion requests should not have any 'ticks' around email key
exports.delete = (req, res) => {
  console.log(req.params.id);
  Feeling.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Feeling with ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Feeling with ID ' + req.params.id,
        });
      }
    } else res.send({ message: `Feeling was deleted successfully!` });
  });
};
