const express = require("express");
const router = express.Router();
const fs = require("fs");
const dbPath = `${process.cwd()}/db/db.json`;

router.get("/groups", (req, res) => {
  //read the db.json file
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Server Error");
    } else {
      const groups = JSON.parse(data).groups;
      res.status(200).send(groups);
    }
  });
});

module.exports = router;
