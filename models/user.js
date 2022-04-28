const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const user = sequelize.define("user", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = user;
