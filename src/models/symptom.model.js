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
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created Symptom: ', { id: res.insertId, ...newSymptom });
    result(null, { id: res.insertId, ...newSymptom });
  });
};

Symptom.findByID = (SymptomId, result) => {
  sql.query(`SELECT * FROM Symptom WHERE ID = ?`, SymptomId, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found Symptom: ', res);
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
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('Symptom: ', res);
    result(null, res);
  });
};

Symptom.remove = (id, result) => {
  sql.query('DELETE FROM Symptom WHERE ID = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Symptom with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('Deleted Symptom with ID: ', id);
    result(null, res);
  });
};

module.exports = Symptom;
