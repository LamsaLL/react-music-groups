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

router.get("/groupsWithMusicians", (req, res) => {
  //read the db.json file
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Server Error");
    } else {
      const musicians = JSON.parse(data).musicians;
      const groups = JSON.parse(data).groups;

      //Add for each group the musicians array matching the musiciansId array
      const groupsWithMusicians = Object.keys(groups).map((groupId) => {
        const group = groups[groupId];
        if (group !== null) {
          const groupMusicians = group.musiciansId.map((musicianId) => {
            return musicians[musicianId];
          });
          return { ...group, musicians: groupMusicians };
        } else {
          return null;
        }
      });

      res.status(200).send(groupsWithMusicians);
    }
  });
});

module.exports = router;
