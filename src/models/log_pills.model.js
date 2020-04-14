// Model for Log_Pills
// Defines connection methods used for a Log_Pills

const sql = require('./db.js');

// constructor
const Log_Pills = function (log_pills) {
  this.User_ID = log_pills.User_ID;
  this.Datetime = log_pills.Datetime;
  this.Medication_ID = log_pills.Medication_ID;
  this.Amount = log_pills.Amount;
  this.Taken = log_pills.Taken;
};

Log_Pills.create = (newLog_Pills, result) => {
  sql.query('INSERT INTO Log_Pills SET ?', newLog_Pills, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newLog_Pills });
  });
};

Log_Pills.findByID = (Log_PillsId, result) => {
  sql.query(
    `SELECT Log_Pills.User_ID, Log_Pills.Datetime, Log_Pills.Medication_ID, Log_Pills.Amount, Log_Pills.Taken
    FROM Log_Pills
    WHERE Log_Pills.User_ID = ?`,
    Log_PillsId,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }

      // not found Log_Pills with the id
      result({ kind: 'not_found' }, null);
    }
  );
};

Log_Pills.findByIDAndDatetime = (Log_PillsId, Log_PillsDatetime, result) => {
  sql.query(
    `SELECT Log_Pills.User_ID, Log_Pills.Datetime, Log_Pills.Medication_ID, Log_Pills.Amount, Log_Pills.Taken
    FROM Log_Pills
    WHERE Log_Pills.User_ID = ?
    AND Log_Pills.Datetime = ?`,
    [Log_PillsId, Log_PillsDatetime],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }

      // not found Log_Pills with the id
      result({ kind: 'not_found' }, null);
    }
  );
};

Log_Pills.getAll = (result) => {
  sql.query('SELECT * FROM Log_Pills', (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Log_Pills.remove = (id, result) => {
  sql.query('DELETE FROM Log_Pills WHERE User_ID = ?', id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Log_Pills with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    result(null, res);
  });
};

module.exports = Log_Pills;
