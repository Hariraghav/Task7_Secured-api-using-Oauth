var express = require("express");
var router = express.Router();
const OAuthServer = require("express-oauth-server");
const oauth = require("../oauth/server");
const authorizationCode = require("../models/authorizationcode");
const client = require("../models/client");
const token = require("../models/token");
const user = require("../models/user");
const sequelize = require("../util/database");
const si = require("systeminformation");

client.hasOne(token, {
  foreignKey: "clientId",
  as: "token",
});
user.hasOne(token, {
  foreignKey: "userId",
  as: "token",
});
token.belongsTo(client, {
  foreignKey: "clientId",
  as: "client",
});
token.belongsTo(user, {
  foreignKey: "userId",
  as: "user",
});

client.hasOne(authorizationCode, {
  foreignKey: "clientId",
  as: "authorizationCode",
});
user.hasOne(authorizationCode, {
  foreignKey: "userId",
  as: "authorizationCode",
});
authorizationCode.belongsTo(client, {
  foreignKey: "clientId",
  as: "client",
});
authorizationCode.belongsTo(user, {
  foreignKey: "userId",
  as: "user",
});

sequelize.sync().then((result) => {
  console.log("success");
});

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/app", function (req, res, next) {
  res.render("app");
});

router.get("/secret", oauth.authenticate(), function (req, res) {
  const si = require("systeminformation");
  valueObject = {
    cpu: "*",
    osInfo: "platform, release",
    system: "model, manufacturer",
  };

  si.get(valueObject).then((data) => {
    console.log(data);
    res.json(data);
  });
});
module.exports = router;
