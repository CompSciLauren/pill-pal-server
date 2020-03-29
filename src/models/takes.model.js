// Model for Medication
// Defines connection methods used for medication

const sql = require('./db.js');

// constructor
const Takes = function(takes) {
  this.User_Email = takes.User_Email;
  this.Medication_Name = takes.Medication_Name;
  this.Amount_Prescribed = takes.Amount_Prescribed;
  this.Refills = takes.Refills;
};

Takes.create = (newEntry, result) => {
  sql.query('INSERT INTO Takes SET ?', newEntry, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newEntry });
  });
};

Takes.findByEmail = (UserId, result) => {
  sql.query(`SELECT * FROM Takes WHERE User_Email = ?`, UserId, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res);
      return;
    }

    // not found User with the id
    result({ kind: 'not_found' }, null);
  });
};

Takes.getAll = result => {
  sql.query('SELECT * FROM Takes', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('Takes: ', res);
    result(null, res);
  });
};

module.exports = Takes;
