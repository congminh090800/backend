const morgan = require("morgan");
const session = require("express-session");
const cors = require("cors");
const helmet = require("helmet");
const config = require("./app/config");

const express = require("express");
const app = express();
app.use(morgan("tiny"));
app.set("trust proxy", 1);
app.use(
  session({
    key: "sid",
    secret: config.app.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: config.app.sessionExpiration,
      path: "/",
      httpOnly: true,
      secure: false,
    },
  })
);

if (config.app.corsDomain.length > 0) {
  app.use(
    cors({
      origin: config.app.corsDomain,
    })
  );
} else {
  app.use(cors());
}

app.use(
  express.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(
  express.json({
    limit: "1mb",
    extended: true,
  })
);
app.use(helmet());

app.use(express.static("public"));
app.use("/", require("./app"));

module.exports = app;
