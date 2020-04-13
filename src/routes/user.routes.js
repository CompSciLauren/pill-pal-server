// Router
// Grant Stewart

module.exports = (app) => {
  const User = require('../controllers/user.controller.js');

  // Create a new User
  app.post('/User', User.create);

  // Retrieve all Users
  app.get('/User', User.findAll);

  // Retrieve a single Customer with ID
  app.get('/User/:id', User.findUser);

  // Retrieve ID of user given a username and password
  app.get('/User/:username/:password', User.findUserByLoginInfo);

  // Delete a Customer with ID
  app.delete('/User/:id', User.delete);
};
