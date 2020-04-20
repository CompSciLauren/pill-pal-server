// Model for Log_BMI
// Defines connection methods used for a Log_BMI

const sql = require('./db.js');

// constructor
const Log_BMI = function (log_bmi) {
  this.User_ID = log_bmi.User_ID;
  this.Date = log_bmi.Date;
  this.Height = log_bmi.Height;
  this.Weight = log_bmi.Weight;
};

Log_BMI.create = (newLog_Feelings, result) => {
  sql.query('INSERT INTO Log_BMI SET ?', newLog_Feelings, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newLog_Feelings });
  });
};

Log_BMI.findByID = (Log_BMI_ID, result) => {
  sql.query(
    `SELECT Log_BMI.User_ID, Log_BMI.Date, Log_BMI.Height, Log_BMI.Weight
    FROM Log_BMI
    WHERE Log_BMI.User_ID = ?`,
    Log_BMI_ID,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }

      // not found Log_BMI with the id
      result({ kind: 'not_found' }, null);
    }
  );
};

Log_BMI.findByIDAndDate = (Log_BMI_ID, Log_BMI_Date, result) => {
  sql.query(
    `SELECT Log_BMI.User_ID, Log_BMI.Date, Log_BMI.Height, Log_BMI.Weight
    FROM Log_BMI
    WHERE Log_BMI.User_ID = ?
    AND Log_BMI.Date = ?`,
    [Log_BMI_ID, Log_BMI_Date],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }

      // not found Log_BMI with the id
      result({ kind: 'not_found' }, null);
    }
  );
};

Log_BMI.getAll = (result) => {
  sql.query('SELECT * FROM Log_BMI', (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Log_BMI.remove = (id, result) => {
  sql.query('DELETE FROM Log_BMI WHERE User_ID = ?', id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Log_BMI with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    result(null, res);
  });
};

module.exports = Log_BMI;
