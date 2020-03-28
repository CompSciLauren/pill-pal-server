// User Controller
// 

const User = require("../models/user.model.js");

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    // Create a User
// JSON example of creating a user
//  {
//   "Email": "email@gmail.com",
//   "Name": "Jeff Bean",
//   "Password": "secret",
//   "Phone_Number": 7775550000
//  }

    const user = new User({
        Email: req.body.Email,
        Name: req.body.Name,
        Password: req.body.Password,
        Phone_Number: req.body.Phone_Number
    });
    console.log("%s,%s,%s,%s", user.Email, user.Name, user.Password, user.Phone_Number);

    // Save User in the database
    User.create(user, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the User."
        });
        else res.send(data);
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        else res.send(data);
      });
};

// Find a single User with a Email
// Find requestes need to be surrounded by single tick 'email@gmail.com'
exports.findUser = (req, res) => {
    User.findByEmail(req.params.email, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `No User found with email ${req.params.email}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving User with email " + req.params.email
            });
          }
        } else res.send(data);
      });
};

// Delete a User with the specified Email in the request
// Any deletion requests should not have any 'ticks' around email key
exports.delete = (req, res) => {
    console.log(req.params.email);
    User.remove(req.params.email, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with Email ${req.params.email}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete User with Email " + req.params.email
            });
          }
        } else res.send({ message: `User was deleted successfully!` });
      });
};
