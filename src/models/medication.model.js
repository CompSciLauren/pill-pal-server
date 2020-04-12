// Model for Medication
// Defines connection methods used for a Medication

const sql = require('./db.js');

// constructor
const Medication = function (medication) {
  this.ID = medication.ID;
  this.Name = medication.Name;
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
        console.log('found Medication: ', res[0]);
        result(null, res[0]);
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

module.exports = Medication;
