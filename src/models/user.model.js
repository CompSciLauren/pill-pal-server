// Model for User
// Defines connection methods used for a User

const sql = require('./db.js');

// constructor
const User = function (user) {
  this.ID = user.ID;
  this.Name = user.Name;
  this.Password = user.Password;
  this.Phone_Number = user.Phone_Number;
};

User.create = (newUser, result) => {
  sql.query('INSERT INTO User SET ?', newUser, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newUser });
  });
};

User.findByID = (UserId, result) => {
  sql.query(`SELECT * FROM User WHERE ID = ?`, UserId, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res);
      return;
    }

    // not found User with the id
    result({ kind: 'not_found' }, null);
  });
};

User.getAll = (result) => {
  sql.query('SELECT * FROM User', (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

User.remove = (id, result) => {
  sql.query('DELETE FROM User WHERE ID = ?', id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    result(null, res);
  });
};

module.exports = User;
