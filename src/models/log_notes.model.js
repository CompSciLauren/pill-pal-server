// Model for Log_Notes
// Defines connection methods used for a Log_Notes

const sql = require('./db.js');

// constructor
const Log_Notes = function (log_notes) {
  this.User_ID = log_notes.User_ID;
  this.Date = log_notes.Date;
  this.Note_Text = log_notes.Note_Text;
};

Log_Notes.create = (newLog_Notes, result) => {
  sql.query('INSERT INTO Log_Notes SET ?', newLog_Notes, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newLog_Notes });
  });
};

Log_Notes.findByID = (Log_NotesId, result) => {
  sql.query(
    `SELECT Log_Notes.User_ID, Log_Notes.Date, Log_Notes.Note_Text
    FROM Log_Notes
    WHERE Log_Notes.User_ID = ?`,
    Log_NotesId,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }

      // not found Log_Notes with the id
      result({ kind: 'not_found' }, null);
    }
  );
};

Log_Notes.findByIDAndDate = (Log_NotesId, Log_NotesDate, result) => {
  sql.query(
    `SELECT Log_Notes.User_ID, Log_Notes.Date, Log_Notes.Note_Text
    FROM Log_Notes
    WHERE Log_Notes.User_ID = ?
    AND Log_Notes.Date = ?`,
    [Log_NotesId, Log_NotesDate],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }

      // not found Log_Notes with the id
      result({ kind: 'not_found' }, null);
    }
  );
};

Log_Notes.getAll = (result) => {
  sql.query('SELECT * FROM Log_Notes', (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Log_Notes.remove = (id, result) => {
  sql.query('DELETE FROM Log_Notes WHERE User_ID = ?', id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Log_Notes with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    result(null, res);
  });
};

module.exports = Log_Notes;
