const express = require("express");
const basicAuth = require("express-basic-auth");

const router = express.Router();

const auth = basicAuth({
  users: {
    admin: "ajax",
  },
});

router.get("/login", auth, (req, res) => {
  const options = {
    httpOnly: true,
    signed: true,
  };

  if (req.auth.user === "admin") {
    res.cookie("name", "admin", options).send({ screen: "admin" });
  }
});

module.exports = router;
