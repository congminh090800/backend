require("dotenv").config();
module.exports = {
  username: process.env.MAIN_DB_USER,
  password: process.env.MAIN_DB_PASS,
  database: process.env.MAIN_DB_NAME,
  host: process.env.MAIN_DB_HOST,
  port: process.env.MAIN_DB_PORT,
  dialect: "postgres",
  operatorsAliases: 0,
  define: {
    underscored: true,
    underscoredAll: true,
  },
};
