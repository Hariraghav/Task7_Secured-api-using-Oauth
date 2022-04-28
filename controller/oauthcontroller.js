const OAuthTokensModel = require("../models/token");
const OAuthClientsModel = require("../models/client");
const OAuthUsersModel = require("../models/user");
const OAuthAuthorizationModel = require("../models/authorizationcode");
const crypto = require("crypto");
module.exports.getAccessToken = function (bearerToken) {
  return OAuthTokensModel.findOne({
    where: {
      accessToken: bearerToken,
    },
    include: [
      {
        model: OAuthClientsModel,
        as: "client",
      },
      {
        model: OAuthUsersModel,
        as: "user",
      },
    ],
  })
    .then((token) => {
      const data = new Object();
      for (const prop in token.get()) data[prop] = token[prop];
      data.client = data.client.get();
      data.user = data.user.get();
      return data;
    })
    .catch((error) => console.error(error));
};

module.exports.getAuthorizationCode = function (authorizationCode) {
  return OAuthAuthorizationModel.findOne({
    where: {
      authorizationCode: authorizationCode,
    },
    include: [
      {
        model: OAuthClientsModel,
        as: "client",
      },
      {
        model: OAuthUsersModel,
        as: "user",
      },
    ],
  });
};

module.exports.getClient = function (clientId, clientSecret) {
  return OAuthClientsModel.findOne({
    where: { clientId: clientId /* , clientSecret: clientSecret */ },
  });
};

module.exports.saveToken = function (token, client, user) {
  console.log(user.dataValues.userId);
  return OAuthTokensModel.create({
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt,
    clientId: client.clientId,
    refreshToken: token.refreshToken,
    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
    userId: user.dataValues.userId,
  })
    .then((token) => {
      const data = new Object();
      for (const prop in token.get()) data[prop] = token[prop];
      data.client = data.clientId;
      data.user = data.userId;

      return data;
    })
    .catch((error) => console.error(error));
};

module.exports.saveAuthorizationCode = function (code, client, user) {
  return OAuthAuthorizationModel.create({
    authorizationCode: code.authorizationCode,
    expiresAt: code.expiresAt,
    redirectUri: code.redirectUri,
    clientId: client.clientId,
    userId: user.user,
  })
    .then((token) => {
      const data = new Object();
      for (const prop in token.get()) data[prop] = token[prop];
      data.client = data.clientId;
      data.user = data.userId;

      return data;
    })
    .catch((error) => console.error(error));
};

module.exports.revokeAuthorizationCode = function (code) {
  return OAuthAuthorizationModel.findOne({
    where: { authorizationCode: code.authorizationCode },
  })
    .then((authorizationCode) => {
      return authorizationCode
        .destroy()
        .then(() => {
          return !!authorizationCode;
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
};
