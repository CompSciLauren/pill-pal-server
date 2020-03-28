// Router
// Grant Stewart

module.exports = app => {
    const Log = require("../controllers/log.controller.js");
  
    // Create a new User
    app.post("/Log", Log.create);

    app.get("/Log", Log.findAll);

    // Retrieve all Logs from User
    app.get("/Log/:email", Log.getAllLogs);
  
    // Retrieve a single Log with email and date
    app.get("Log/:email/:date", Log.getLog);
  
    // Retrieve a single Log with email and date
    app.put("/Log/:email/:date", Log.update);

    // Delete a Log with email and date
    app.delete("/Log/:email/:date", Log.delete);
  

  };