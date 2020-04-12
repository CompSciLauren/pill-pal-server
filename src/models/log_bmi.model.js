// Model for Logs
// Defines connection methods used for a LogEntry

const sql = require('./db.js');

// constructor
const LogEntry = function (entry) {
  this.User_ID = entry.User_ID;
  this.Date = entry.Date;
  this.Height = entry.Height;
  this.Weight = entry.Weight;
};

LogEntry.create = (newLogEntry, result) => {
  sql.query('INSERT INTO Log_BMI SET ?', newLogEntry, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created Log: ', { id: res.insertId, ...newLogEntry });
    result(null, { id: res.insertId, ...newLogEntry });
  });
};

LogEntry.getLog = (user_id, date, result) => {
  sql.query(
    `SELECT * FROM Log_BMI WHERE User_ID = ? AND Date = ?`,
    [user_id, date],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log('found User: ', res[0]);
        result(null, res[0]);
        return;
      }

      // not found User with the id
      result({ kind: 'not_found' }, null);
    }
  );
};

LogEntry.getAllLogs = (user_id, result) => {
  sql.query(`SELECT * FROM Log_BMI WHERE User_ID = ?`, user_id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('Log: ', res);
    result(null, res);
  });
};

LogEntry.update = (user_id, date, newLog) => {
  sql.query(
    'UPDATE Log_BMI SET User_ID = ?, Date = ?, Height = ? WHERE User_ID = ? and Date = ?',
    [newLog.User_ID, newLog.Date, newLog.Height, newLog.Weight, user_id, date],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Log with the user_id and date
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('updated customer: ', { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

LogEntry.remove = (user_id, date, result) => {
  sql.query(
    'DELETE FROM Log_BMI WHERE User_ID = ? AND Date = ?',
    [user_id, date],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Log with the user_id
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('Deleted Log with Email: ', user_id);
      result(null, res);
    }
  );
};

LogEntry.getAll = (result) => {
  sql.query('SELECT * FROM Log_BMI', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('User: ', res);
    result(null, res);
  });
};

module.exports = LogEntry;
