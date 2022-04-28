var express = require("express");
var router = express.Router();
const oauthServer = require("../oauth/server");
const usermodel = require("../models/user");
router.get("/", function (req, res, next) {
  res.render("oauthauthenticate");
});

router.post(
  "/authorize",
  (req, res, next) => {
    var user;
    var pass;
    const { username, password } = req.body;
    usermodel
      .findOne({
        where: { name: username, password: password },
      })
      .then((u) => {
        if (u != null) {
          var user = u.dataValues.name;
          var pass = u.dataValues.password;
          if (username == user && password == pass) {
            req.body.user = { user: u.dataValues.userId };
            return next();
          }
        }
        const params = [
          "client_id",
          "redirect_uri",
          "response_type",
          "grant_type",
          "state",
        ]
          .map((a) => `${a}=${req.body[a]}`)
          .join("&");
        return res.redirect(`/oauth?success=false&${params}`);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  (req, res, next) => {
    return next();
  },
  oauthServer.authorize({
    authenticateHandler: {
      handle: (req) => {
        return req.body.user;
      },
    },
  })
);

router.post(
  "/token",
  (req, res, next) => {
    next();
  },
  oauthServer.token({
    requireClientAuthentication: {
      authorization_code: false,
    },
  })
);
module.exports = router;
