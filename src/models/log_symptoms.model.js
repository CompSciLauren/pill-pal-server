// Model for Log_Symptoms
// Defines connection methods used for a Log_Symptoms

const sql = require('./db.js');

// constructor
const Log_Symptoms = function (log_symptoms) {
  this.ID = log_symptoms.ID;
  this.Name = log_symptoms.Name;
  this.Feelings_ID = log_symptoms.Feelings_ID;
  this.Feelings_Intensity = log_symptoms.Feelings_Intensity;
};

Log_Symptoms.create = (newLog_Symptoms, result) => {
  sql.query('INSERT INTO Log_Symptoms SET ?', newLog_Symptoms, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newLog_Symptoms });
  });
};

Log_Symptoms.findByID = (Log_SymptomsId, result) => {
  sql.query(
    `SELECT Log_Symptoms.User_ID, Log_Symptoms.Date, Log_Symptoms.Symptom_ID, Log_Symptoms.Symptom_Intensity, Symptoms.Display_Name
    FROM Log_Symptoms
    JOIN Symptoms
    ON Symptoms.ID = Log_Symptoms.Symptom_ID
    WHERE Log_Symptoms.User_ID = ?`,
    Log_SymptomsId,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }

      // not found Log_Symptoms with the id
      result({ kind: 'not_found' }, null);
    }
  );
};

Log_Symptoms.getAll = (result) => {
  sql.query('SELECT * FROM Log_Symptoms', (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Log_Symptoms.remove = (id, result) => {
  sql.query('DELETE FROM Log_Symptoms WHERE User_ID = ?', id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Log_Symptoms with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    result(null, res);
  });
};

module.exports = Log_Symptoms;
