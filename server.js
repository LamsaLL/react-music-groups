//require express
const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());

const musiciansRouter = require("./routes/musicians");
const musicianRouter = require("./routes/musician");

app.use(bodyParser.json());
//routes
app.use(musiciansRouter);
app.use(musicianRouter);

//express listen on port 3000
app.listen(port, () => {
  console.log(`istening on port ${port})`);
});
