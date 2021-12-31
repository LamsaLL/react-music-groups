//require express
const express = require("express");
const app = express();
const port = 3001;

// create a GET route
app.get("/express_backend", (req, res) => {
  //Line 9
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" }); //Line 10
}); //Line 11

//express listen on port 3000
app.listen(port, () => {
  console.log("listening on port 3001");
});
