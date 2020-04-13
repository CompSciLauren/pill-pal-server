// Model for Symptom
// Defines connection methods used for a Symptom

const sql = require('./db.js');

// constructor
const Symptom = function (symptom) {
  this.ID = symptom.ID;
  this.Name = symptom.Name;
};

Symptom.create = (newSymptom, result) => {
  sql.query('INSERT INTO Symptom SET ?', newSymptom, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newSymptom });
  });
};

Symptom.findByID = (SymptomId, result) => {
  sql.query(`SELECT * FROM Symptom WHERE ID = ?`, SymptomId, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res);
      return;
    }

    // not found Symptom with the id
    result({ kind: 'not_found' }, null);
  });
};

Symptom.getAll = (result) => {
  sql.query('SELECT * FROM Symptom', (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Symptom.remove = (id, result) => {
  sql.query('DELETE FROM Symptom WHERE ID = ?', id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Symptom with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    result(null, res);
  });
};

module.exports = Symptom;
