const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const authorizationCode = sequelize.define("authorizationCode", {
  authorizationCode: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  expiresAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  redirectUri: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  clientId: {
    type: Sequelize.STRING,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = authorizationCode;
