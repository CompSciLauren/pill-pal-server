// Model for Log_Feelings
// Defines connection methods used for a Log_Feelings

const sql = require('./db.js');

// constructor
const Log_Feelings = function (log_feelings) {
  this.User_ID = log_feelings.User_ID;
  this.Date = log_feelings.Date;
  this.Feeling_ID = log_feelings.Feeling_ID;
  this.Feeling_Intensity = log_feelings.Feeling_Intensity;
};

Log_Feelings.create = (newLog_Feelings, result) => {
  sql.query('INSERT INTO Log_Feelings SET ?', newLog_Feelings, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newLog_Feelings });
  });
};

Log_Feelings.findByID = (Log_FeelingsId, result) => {
  sql.query(
    `SELECT Log_Feelings.User_ID, Log_Feelings.Date, Log_Feelings.Feeling_ID, Log_Feelings.Feeling_Intensity, Feeling.Display_Name
    FROM Log_Feelings
    JOIN Feeling
    ON Feeling.ID = Log_Feelings.Feeling_ID
    WHERE Log_Feelings.User_ID = ?`,
    Log_FeelingsId,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }

      // not found Log_Feelings with the id
      result({ kind: 'not_found' }, null);
    }
  );
};

Log_Feelings.findByIDAndDate = (Log_FeelingsId, Log_FeelingsDate, result) => {
  sql.query(
    `SELECT Log_Feelings.User_ID, Log_Feelings.Date, Log_Feelings.Feeling_ID, Log_Feelings.Feeling_Intensity, Feeling.Display_Name
    FROM Log_Feelings
    JOIN Feeling
    ON Feeling.ID = Log_Feelings.Feeling_ID
    WHERE Log_Feelings.User_ID = ?
    AND Log_Feelings.Date = ?`,
    [Log_FeelingsId, Log_FeelingsDate],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }

      // not found Log_Feelings with the id
      result({ kind: 'not_found' }, null);
    }
  );
};

Log_Feelings.getAll = (result) => {
  sql.query('SELECT * FROM Log_Feelings', (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Log_Feelings.remove = (id, result) => {
  sql.query('DELETE FROM Log_Feelings WHERE User_ID = ?', id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Log_Feelings with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    result(null, res);
  });
};

module.exports = Log_Feelings;
