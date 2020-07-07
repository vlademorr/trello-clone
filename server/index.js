const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes");

const app = express();

require("dotenv").config();

const startExpressApp = () => {
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, "./../../build")));
  app.use(bodyParser.json());
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD");
    next();
  });

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./../../build", "index.html"));
  });

  routes(app);

  startServer();
};

const startServer = () => {
  const server = http.createServer(app);
  server.listen(process.env.PORT || 8080, function () {
    console.log(
      `==== Server started on port ${process.env.PORT || 8080} =====`
    );
  });
};

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017", {
    dbName: process.env.DB_NAME || "Trello-clone",
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database successfully connected");
    startExpressApp();
  })
  .catch((err) => console.log(err));
