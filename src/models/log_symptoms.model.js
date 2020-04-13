// Model for Logs
// Defines connection methods used for a Log_Symptoms

const sql = require('./db.js');

// constructor
const Log_Symptoms = function (entry) {
  this.User_ID = entry.User_ID;
  this.Date = entry.Date;
  this.Symptom_ID = entry.Symptom_ID;
  this.Symptom_Intensity = entry.Symptom_Intensity;
};

Log_Symptoms.create = (newLog_Symptoms, result) => {
  sql.query('INSERT INTO Log_Symptoms SET ?', newLog_Symptoms, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created Log: ', { id: res.insertId, ...newLog_Symptoms });
    result(null, { id: res.insertId, ...newLog_Symptoms });
  });
};

Log_Symptoms.getLog = (user_id, date, result) => {
  sql.query(
    `SELECT * FROM Log_Symptoms WHERE User_ID = ? AND Date = ?`,
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

Log_Symptoms.getAllLogs = (user_id, result) => {
  sql.query(
    `SELECT * FROM Log_Symptoms WHERE User_ID = ?`,
    user_id,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }

      console.log('Log: ', res);
      result(null, res);
    }
  );
};

Log_Symptoms.update = (user_id, date, newLog) => {
  sql.query(
    'UPDATE Log_Symptoms SET User_ID = ?, Date = ?, Symptom_ID = ? WHERE User_ID = ? and Date = ?',
    [
      newLog.User_ID,
      newLog.Date,
      newLog.Symptom_ID,
      newLog.Symptom_Intensity,
      user_id,
      date,
    ],
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

Log_Symptoms.remove = (user_id, date, result) => {
  sql.query(
    'DELETE FROM Log_Symptoms WHERE User_ID = ? AND Date = ?',
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

Log_Symptoms.getAll = (result) => {
  sql.query('SELECT * FROM Log_Symptoms', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('User: ', res);
    result(null, res);
  });
};

module.exports = Log_Symptoms;
