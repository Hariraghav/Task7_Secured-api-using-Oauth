const OAuthServer = require("express-oauth-server");
const OauthController = require("../controller/oauthcontroller");
module.exports = new OAuthServer({
  model: OauthController,
  grants: ["authorization_code"],
  accessTokenLifetime: 60 * 60 * 24,
  allowEmptyState: true,
  allowExtendedTokenAttributes: true,
});
