// Model for Feeling
// Defines connection methods used for a Feeling

const sql = require('./db.js');

// constructor
const Feeling = function (feeling) {
  this.ID = feeling.ID;
  this.Name = feeling.Name;
};

Feeling.create = (newFeeling, result) => {
  sql.query('INSERT INTO Feeling SET ?', newFeeling, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created Feeling: ', { id: res.insertId, ...newFeeling });
    result(null, { id: res.insertId, ...newFeeling });
  });
};

Feeling.findByID = (FeelingId, result) => {
  sql.query(`SELECT * FROM Feeling WHERE ID = ?`, FeelingId, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found Feeling: ', res);
      result(null, res);
      return;
    }

    // not found Feeling with the id
    result({ kind: 'not_found' }, null);
  });
};

Feeling.getAll = (result) => {
  sql.query('SELECT * FROM Feeling', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('Feeling: ', res);
    result(null, res);
  });
};

Feeling.remove = (id, result) => {
  sql.query('DELETE FROM Feeling WHERE ID = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Feeling with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('Deleted Feeling with ID: ', id);
    result(null, res);
  });
};

module.exports = Feeling;
