//require express
const express = require("express");
const app = express();
const port = 3001;

const cors = require("cors");
const bodyParser = require("body-parser");

const musiciansRouter = require("./routes/musicians");
const musicianRouter = require("./routes/musician");
const groupsRouter = require("./routes/groups");
const groupRouter = require("./routes/group");

//Middlewares
app.use(cors());
app.use(bodyParser.json());
//Routes
app.use(musiciansRouter);
app.use(musicianRouter);
app.use(groupsRouter);
app.use(groupRouter);

//express listen on port 300
app.listen(port, () => {
  console.log(`istening on port ${port})`);
});
