// Model for Medication
// Defines connection methods used for a Medication

const sql = require('./db.js');

// constructor
const Medication = function (medication) {
  this.ID = medication.ID;
  this.Name = medication.Name;
};

Medication.create = (newMedication, result) => {
  sql.query('INSERT INTO Medication SET ?', newMedication, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created Medication: ', { id: res.insertId, ...newMedication });
    result(null, { id: res.insertId, ...newMedication });
  });
};

Medication.findByID = (MedicationId, result) => {
  sql.query(
    `SELECT * FROM Medication WHERE ID = ?`,
    MedicationId,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log('found Medication: ', res);
        result(null, res);
        return;
      }

      // not found Medication with the id
      result({ kind: 'not_found' }, null);
    }
  );
};

Medication.getAll = (result) => {
  sql.query('SELECT * FROM Medication', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('Medication: ', res);
    result(null, res);
  });
};

Medication.remove = (id, result) => {
  sql.query('DELETE FROM Medication WHERE ID = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Medication with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('Deleted Medication with ID: ', id);
    result(null, res);
  });
};

module.exports = Medication;
