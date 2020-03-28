const Takes = require('../models/takes.model.js');

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
