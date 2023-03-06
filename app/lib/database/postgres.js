const config = require("../../config");
const Sequelize = require("sequelize");

const dbs = [];
let numberDb = 0;

module.exports = {
  init: async (callback) => {
    let num = 0;
    const start = async (db, dbName) => {
      try {
        db.authenticate()
          .then(async function () {
            console.log(`${dbName} - Connection has been established successfully.`);
          })
          .catch(function (err) {
            console.log(`${dbName} - Unable to connect to the database:`, err);
          });

        num++;
        if (num >= numberDb) {
          callback();
        }
      } catch (err) {
        console.err(err);
        callback(err);
      }
    };

    const dbNames = Object.keys(config.db);
    numberDb = dbNames.length;

    dbNames.forEach(async (dbName) => {
      dbs[dbName] = new Sequelize(
        config.db[dbName].database,
        config.db[dbName].username,
        config.db[dbName].password,
        config.db[dbName].options
      );
      await start(dbs[dbName], dbName);
    });
  },
  Sequelize: Sequelize,
  db() {
    return {
      ...dbs,
    };
  },
};
