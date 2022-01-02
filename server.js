//require express
const express = require("express");
const app = express();
const port = 3001;
var cors = require("cors");

app.use(cors());

const musiciansRouter = require("./routes/musicians");

//routes
app.use(musiciansRouter);

//express listen on port 3000
app.listen(port, () => {
  console.log(`istening on port ${port})`);
});
