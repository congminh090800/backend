const config = {
  jokes_db: {
    database: process.env.MAIN_DB_NAME,
    username: process.env.MAIN_DB_USER,
    password: process.env.MAIN_DB_PASS,
    options: {
      host: process.env.MAIN_DB_HOST,
      port: process.env.MAIN_DB_PORT,
      dialect: "postgres",
      logging: (process.env.POSTPRES_DEBUG || "0") === "1" ? console.log : false,
      pool: {
        max: parseInt(process.env.POSTPRES_POOL_MAX || "20"),
        min: 0,
        acquire: 60000,
        idle: 10000,
      },
    },
  },
};

module.exports = config;
