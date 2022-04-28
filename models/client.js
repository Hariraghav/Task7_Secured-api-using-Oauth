const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const client = sequelize.define("client", {
  clientId: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  clientSecret: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  redirectUris: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  grants: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
});

module.exports = client;
