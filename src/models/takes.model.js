// Model for Medication
// Defines connection methods used for medication

const sql = require('./db.js');

// constructor
const Takes = function (takes) {
  this.User_ID = takes.User_ID;
  this.Medication_ID = takes.Medication_ID;
  this.Amount_Prescribed = takes.Amount_Prescribed;
  this.Refills = takes.Refills;
};

Takes.create = (newEntry, result) => {
  if (newEntry.Medication_ID.includes('alexa')) {
    switch (newEntry.Medication_ID) {
      case 'alexaadderall':
        newEntry.Medication_ID = 0;
        break;
      case 'alexabirth_control':
        newEntry.Medication_ID = 1;
        break;
      case 'alexahydrocodone':
        newEntry.Medication_ID = 2;
        break;
      case 'alexameloxicam':
        newEntry.Medication_ID = 3;
        break;
      case 'alexamethadone':
        newEntry.Medication_ID = 4;
        break;
      case 'alexaopioid':
        newEntry.Medication_ID = 5;
        break;
      case 'alexaoxycodone':
        newEntry.Medication_ID = 6;
        break;
    }
  }

  sql.query('INSERT INTO Takes SET ?', newEntry, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newEntry });
  });
};

Takes.updatePill = (
  userID,
  medicationID,
  amountPrescribed,
  refills,
  displayName,
  result
) => {
  console.log(
    'user:',
    userID,
    'medID:',
    medicationID,
    'amount:',
    amountPrescribed,
    'refills:',
    refills,
    'disp:',
    displayName
  );
  sql.query(
    `UPDATE Takes SET Amount_Prescribed = ?, Refills = ? WHERE User_ID = ? AND Medication_ID = ?`,
    [amountPrescribed, refills, userID, medicationID],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
    }
  );
};

Takes.findByUser_ID = (UserId, result) => {
  sql.query(
    `SELECT Takes.User_ID, Takes.Medication_ID, Takes.Amount_Prescribed, Takes.Refills, Medication.Display_Name
    FROM Takes
    JOIN Medication
    ON Medication.ID = Takes.Medication_ID
    WHERE Takes.User_ID = ?`,
    UserId,
    (err, res) => {
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
    }
  );
};

Takes.getAll = (result) => {
  sql.query('SELECT * FROM Takes', (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Takes.remove = (user_id, Medication_ID, result) => {
  if (Medication_ID.includes('alexa')) {
    switch (Medication_ID) {
      case 'alexaAdderall':
        Medication_ID = 0;
        break;
      case 'alexaBirth Control':
        Medication_ID = 1;
        break;
      case 'alexaHydrocodone':
        Medication_ID = 2;
        break;
      case 'alexaMeloxicam':
        Medication_ID = 3;
        break;
      case 'alexaMethadone':
        Medication_ID = 4;
        break;
      case 'alexaOpioid':
        Medication_ID = 5;
        break;
      case 'alexaOxycodone':
        Medication_ID = 6;
        break;
    }
  }

  let values = [user_id, Medication_ID];

  sql.query(
    'DELETE FROM Takes WHERE User_ID = ? AND Medication_ID = ?',
    values,
    (err, res) => {
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
    }
  );
};

Takes.removeAll = (user_id, result) => {
  sql.query('DELETE FROM Takes WHERE User_ID = ?', user_id, (err, res) => {
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

module.exports = Takes;
