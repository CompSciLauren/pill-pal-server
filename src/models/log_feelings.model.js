// Model for Log_Feelings
// Defines connection methods used for a Log_Feelings

const sql = require('./db.js');

// constructor
const Log_Feelings = function (log_feelings) {
  this.ID = log_feelings.ID;
  this.Name = log_feelings.Name;
  this.Feelings_ID = log_feelings.Feelings_ID;
  this.Feelings_Intensity = log_feelings.Feelings_Intensity;
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
    `SELECT * FROM Log_Feelings WHERE User_ID = ?`,
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
