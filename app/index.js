const express = require("express");
const baseResponse = require("./lib/base-response");
const config = require("./config");

const router = express.Router();
router.use(baseResponse());

const healthCheckFn = (req, res) => {
  const result = {
    message: "Hello",
    app: config.app.name,
    version: config.app.version,
    buildNumber: config.app.buildNumber,
    tagVersion: config.app.tagVersion,
    description: config.app.description,
    swaggerLink: `${config.app.endpoint}/api-docs`,
  };

  res.json(result);
};

router.get("/health", healthCheckFn);
require("./config/swagger")(router);

router.use("/api", require("./feature"));

router.use(function (req, res) {
  res.notFound("Not Found");
});

router.use((err, req, res, next) => {
  console.log(err);
  res.serverInternalError(err.message);
});

module.exports = router;
