const express = require("express");
const router = express.Router();
const fs = require("fs");
const dbPath = `${process.cwd()}/db/db.json`;
// router.get("/musician/:id", (req, res) => {
//   const todoId = req.params.id;

//   res.json(req.db[todoId]);
// });

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
      newMusician.id = db.length + 1;

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

// router.patch("/todo/:id", (req, res) => {
//   const {
//     params: { id },
//     body,
//     db,
//   } = req;

//   db[id] = { ...db[id], ...body };
//   req.saveDb(db, () => res.json(db[id]));
// });

// router.delete("/todo/:id", (req, res) => {
//   const {
//     params: { id },
//     body,
//     db,
//   } = req;

//   db[id] = null;
//   req.saveDb(db, () => res.json(db));
// });

module.exports = router;
