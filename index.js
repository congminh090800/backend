require("dotenv").config();

const config = require("./app/config");
const database = require("./app/lib/database");

database.init(async (err) => {
  if (err) {
    console.error("database start fail:", err);
    return;
  }

  require("./app/model").init(function () {});
  const app = require("./server.js");
  app.listen(config.app.port, function () {
    console.log(`server start successfully on port: ${config.app.port}`);

    const exec = require("child_process").exec;
    const cmd = "npx sequelize-cli db:migrate";
    exec(cmd, function (error, stdout, stderr) {
      if (error) {
        console.error(error);
      }

      if (stdout) {
        console.error("stdout ", stdout);
      }

      if (stderr) {
        console.error("stderr ", stderr);
      }
    });
  });

  process.on("SIGINT", () => {
    process.exit(0);
  });
});

process.on("unhandledRejection", function (reason, p) {
  console.error("unhandledRejection", reason, p);
});

process.on("uncaughtException", (err) => {
  console.error("uncaughtException", err);
});
