// Router
// Grant Stewart

module.exports = app => {
    const User = require("../controllers/user.controller.js");
  
    // Create a new User
    app.post("/User", User.create);
  
    // Retrieve all Users
    app.get("/User", User.findAll);
  
    // Retrieve a single Customer with email
    app.get("/User/:email", User.findUser);
  
    // Delete a Customer with email
    app.delete("/User/:email", User.delete);
  

  };