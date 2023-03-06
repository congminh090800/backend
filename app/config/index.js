const pkg = require("../../package.json");
const config = {
  app: {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    buildNumber: process.env.BUILD_NUMBER || process.env.CI_JOB_ID || "0001",
    tagVersion: process.env.TAG_NAME || "",
    port: parseInt(process.env.APP_PORT || 3000),
    corsDomain: Object.entries(process.env)
      .filter(([key]) => key.startsWith("APP_CORS_DOMAIN"))
      .map(([_, val]) => val),
    sessionSecret: process.env.SESSION_SECRET,
    sessionExpiration: parseInt(process.env.SESSION_EXPIRATION) || 3600000,
    endpoint: process.env.BACKEND_SERVER || "http://localhost:3000",
  },
  db: require("./database"),
};

module.exports = config;
