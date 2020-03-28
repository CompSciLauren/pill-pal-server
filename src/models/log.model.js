// Model for Logs
// Defines connection methods used for a LogEntry

const sql = require("./db.js");

// constructor
const LogEntry = function(entry) {
  this.User_Email = entry.User_Email;
  this.Date = entry.Date;
  this.Height = entry.Height;
  this.Weight = entry.Weight;
};

LogEntry.create = (newLogEntry, result) => {
  sql.query("INSERT INTO Log SET ?", newLogEntry, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Log: ", { id: res.insertId, ... newLogEntry});
    result(null, { id: res.insertId, ...newLogEntry });
  });
};

LogEntry.getLog = (email, date, result) => {
  sql.query(`SELECT * FROM Log WHERE User_Email = ? AND Date = ?`, [email, date], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

LogEntry.getAllLogs = (email, result) => {
  sql.query('SELECT * FROM Log WHERE User_Email = ?', email, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Log: ", res);
    result(null, res);
  });
};

LogEntry.update = (email, date, newLog) => {
    sql.query(
        "UPDATE Log SET User_Email = ?, Date = ?, Height = ? WHERE User_Email = ? and Date = ?",
        [newLog.User_Email, newLog.Date, newLog.Height, newLog.Weight, email, date],
        (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Log with the email and date
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated customer: ", { id: id, ...customer });
        result(null, { id: id, ...customer });
        }
    );
};

LogEntry.remove = (email, date, result) => {
  sql.query("DELETE FROM Log WHERE User_Email = ? AND Date = ?", [email, date], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Log with the email
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted Log with Email: ", email);
    result(null, res);
  });
};


LogEntry.getAll = result => {
    sql.query("SELECT * FROM Log", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("User: ", res);
      result(null, res);
    });
  };
  

module.exports = LogEntry;