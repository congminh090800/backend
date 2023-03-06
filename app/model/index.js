const database = require("../lib/database");

module.exports = {
  init: (callback, isSeeding = true) => {
    require("./jokes_db");

    Object.values(database.db()).forEach((db) => {
      db.sync({ force: false }).then(() => {
        console.log("Resync wallet data model and do not drop any data");
        if (isSeeding) {
          require("./jokes_db/seed");
        }
        if (callback) {
          callback();
        }
      });
    });
  },
};
