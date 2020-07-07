const boardRoute = require("./boards");
const cardRoute = require("./card");

const routes = (app) => {
  app.use("/boards", boardRoute());
  app.use("/cards", cardRoute());
  app.use((err, req, res, next) => {
    next(err);
  });
};

module.exports = routes;
