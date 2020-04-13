// Rest API - starts server on port 3000
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to PillPal!' });
});

require('./routes/user.routes.js')(app);
require('./routes/takes.routes.js')(app);
require('./routes/log_bmi.routes.js')(app);
require('./routes/medication.routes.js')(app);
require('./routes/log_symptoms.routes.js')(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
