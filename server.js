//require express
const express = require("express");
const app = express();
const port = 3001;

const cors = require("cors");
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

const loginRouter = require("./routes/login");
const cookieRouter = require("./routes/cookie");
const musiciansRouter = require("./routes/musicians");
const musicianRouter = require("./routes/musician");
const groupsRouter = require("./routes/groups");
const groupRouter = require("./routes/group");

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser("82e4e438a0705fabf61f9854e3b575af"));
//Routes
app.use(loginRouter);
app.use(cookieRouter);
app.use(musiciansRouter);
app.use(musicianRouter);
app.use(groupsRouter);
app.use(groupRouter);

//express listen on port 300
app.listen(port, () => {
  console.log(`istening on port ${port})`);
});
