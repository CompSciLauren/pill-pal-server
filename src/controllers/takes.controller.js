const Takes = require('../models/takes.model.js');

// Create and Save a new Takes row
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  // Create a Takes entry
  // JSON example of creating a Takes entry
  //  {
  //   "Email": "email@gmail.com",
  //   "Name": "Jeff Bean",
  //   "Password": "secret",
  //   "Phone_Number": 7775550000
  //  }

  const takes = new Takes({
    User_Email: req.body.User_Email,
    Medication_Name: req.body.Medication_Name,
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

// Find a single User's current medication via their email address
// Find requests need to be surrounded by single tick 'email@gmail.com'
exports.findMedication = (req, res) => {
  Takes.findByEmail(req.params.email, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No User found with email ${req.params.email}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving User with email ' + req.params.email,
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
