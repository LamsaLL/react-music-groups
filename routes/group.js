const express = require("express");
const router = express.Router();
const fs = require("fs");
const dbPath = `${process.cwd()}/db/db.json`;

router.get("/group/:id", (req, res) => {
  //read file and get group with id
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Server Error");
    } else {
      const groupId = req.params.id;
      const db = JSON.parse(data).groups;
      //find group with id
      const group = db[groupId];
      if (group) {
        res.status(200).send(group);
      } else {
        res.status(404).send("Group not found");
      }
    }
  });
});

router.post("/group", (req, res) => {
  const newGroup = req.body;
  //write to the db.json file
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Server Error");
    } else {
      const db = JSON.parse(data);
      const groups = JSON.parse(data).groups;
      //add id to new group
      newGroup.id = groups.length;

      db.groups.push(newGroup);

      fs.writeFile(dbPath, JSON.stringify(db), (err) => {
        if (err) {
          console.log(err);
          res.status(500).send("Server Error");
        } else {
          res.status(201).send(newGroup);
        }
      });
    }
  });

  res.json(newGroup);
});

router.patch("/group/:id", (req, res) => {
  const {
    params: { id },
    body,
  } = req;
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Server Error");
    } else {
      const db = JSON.parse(data);

      if (id === -1) {
        res.status(404).send("Group not found");
      } else {
        db.groups[id] = {
          ...db.groups[id],
          ...body,
        };
        fs.writeFile(dbPath, JSON.stringify(db), (err) => {
          if (err) {
            console.log(err);
            res.status(500).send("Server Error");
          } else {
            res.status(200).send(db.groups[id]);
          }
        });
      }
    }
  });
});

router.delete("/group/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Server Error");
    } else {
      //set element null if id match with id of element
      const db = JSON.parse(data);
      if (id === -1) {
        res.status(404).send("Group not found");
      } else {
        db.groups[id] = null;
        fs.writeFile(dbPath, JSON.stringify(db), (err) => {
          if (err) {
            console.log(err);
            res.status(500).send("Server Error");
          } else {
            res.status(200).send(db.groups);
          }
        });
      }
    }
  });
});

module.exports = router;
