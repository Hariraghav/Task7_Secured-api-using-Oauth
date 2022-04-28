const Sequelize = require("sequelize");

const sequelize = new Sequelize("api", "postgres", "root", {
  dialect: "postgres",
  host: "localhost",
});

module.exports = sequelize;
