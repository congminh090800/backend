const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const config = require("../index");

module.exports = function (app) {
  let options = {
    swaggerDefinition: {
      info: {
        title: "HAHA Docs",
        version: config.app.version + " " + config.app.tagVersion,
        description: config.app.description,
      },
      servers: [
        {
          url: config.app.endpoint,
        },
      ],
    },
    apis: [path.resolve(__dirname, "../../feature/**/*.js")],
  };

  const swaggerSpec = swaggerJSDoc(options);
  app.get("/api-docs.json", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    (swaggerSpec.securityDefinitions = {
      bearerAuth: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
      },
    }),
      (swaggerSpec.security = [
        {
          bearerAuth: [],
        },
      ]);

    res.send(swaggerSpec);
  });

  options = {
    swaggerUrl: "/api-docs.json",
    showExplorer: true,
  };

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(null, options));
};
