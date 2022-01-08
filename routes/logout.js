const express = require("express");
const basicAuth = require("express-basic-auth");

const router = express.Router();

router.get("/logout", function (req, res) {
  res.set("WWW-Authenticate", "Basic realm=Authorization Required");
  return res.sendStatus(401);
});

module.exports = router;
