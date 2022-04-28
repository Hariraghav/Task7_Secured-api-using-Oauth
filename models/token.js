const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const token = sequelize.define("token", {
  accessToken: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  accessTokenExpiresAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  clientId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = token;
