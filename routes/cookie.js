const express = require("express");
const router = express.Router();

router.get("/read-cookie", (req, res) => {
  if (req.signedCookies.name === "admin") {
    res.send({ screen: "admin" });
  } else if (req.signedCookies.name === "user") {
    res.send({ screen: "user" });
  } else {
    res.send({ screen: "auth" });
  }
});

router.get("/clear-cookie", (req, res) => {
  res.clearCookie("name").end();
});

module.exports = router;
