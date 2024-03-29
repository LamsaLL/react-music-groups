const express = require("express");
const router = express.Router();
const fs = require("fs");
const dbPath = `${process.cwd()}/db/db.json`;

router.get("/musicians", (req, res) => {
  // Read the db.json file
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Server Error");
    } else {
      const musicians = JSON.parse(data).musicians;
      res.status(200).send(musicians);
    }
  });
});

module.exports = router;
