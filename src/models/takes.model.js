// Model for Medication
// Defines connection methods used for medication

const sql = require('./db.js');

// constructor
const Takes = function (takes) {
  this.User_ID = takes.User_ID;
  this.Medication_ID = takes.Medication_ID;
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

Takes.findByUser_ID = (UserId, result) => {
  sql.query(
    `SELECT Takes.User_ID, Takes.Medication_ID, Takes.Amount_Prescribed, Takes.Refills, Medication.Display_Name
    FROM Takes
    JOIN Medication
    ON Medication.ID = Takes.Medication_ID
    WHERE Takes.User_ID = ?`,
    UserId,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }

      // not found User with the id
      result({ kind: 'not_found' }, null);
    }
  );
};

Takes.getAll = (result) => {
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

Takes.remove = (user_id, medication_id, result) => {
  let values = [user_id, medication_id];
  sql.query(
    'DELETE FROM Takes WHERE User_ID = ? AND Medication_ID = ?',
    values,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('Deleted User with ID: ', user_id);
      result(null, res);
    }
  );
};

Takes.removeAll = (user_id, result) => {
  sql.query('DELETE FROM Takes WHERE User_ID = ?', user_id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('Deleted User with ID: ', user_id);
    result(null, res);
  });
};

module.exports = Takes;
