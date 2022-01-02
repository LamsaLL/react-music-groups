const express = require("express");
const router = express.Router();
const fs = require("fs");
const dbPath = `${process.cwd()}/db/db.json`;

router.get("/musician/:id", (req, res) => {
  //read file and get musician with id
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Server Error");
    } else {
      const musicianId = req.params.id;
      const db = JSON.parse(data);
      //find musician with id
      const musician = db[musicianId];
      if (musician) {
        res.status(200).send(musician);
      } else {
        res.status(404).send("Musician not found");
      }
    }
  });
});

router.post("/musician", (req, res) => {
  const newMusician = req.body;
  //write to the db.json file
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Server Error");
    } else {
      const db = JSON.parse(data);
      //add id to new musician
      newMusician.id = db.length;

      db.push(newMusician);
      fs.writeFile(dbPath, JSON.stringify(db), (err) => {
        if (err) {
          console.log(err);
          res.status(500).send("Server Error");
        } else {
          res.status(201).send(newMusician);
        }
      });
    }
  });

  res.json(newMusician);
});

router.patch("/musician/:id", (req, res) => {
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
        res.status(404).send("Musician not found");
      } else {
        db[id] = {
          ...db[id],
          ...body,
        };
        fs.writeFile(dbPath, JSON.stringify(db), (err) => {
          if (err) {
            console.log(err);
            res.status(500).send("Server Error");
          } else {
            res.status(200).send(db[id]);
          }
        });
      }
    }
  });
});

router.delete("/musician/:id", (req, res) => {
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
        res.status(404).send("Musician not found");
      } else {
        db[id] = null;
        fs.writeFile(dbPath, JSON.stringify(db), (err) => {
          if (err) {
            console.log(err);
            res.status(500).send("Server Error");
          } else {
            res.status(200).send(db);
          }
        });
      }
    }
  });
});

module.exports = router;
