const express = require("express");
const association = require("./util/dbAssoc");

const app = express();

const userRouter = require("./routes/userRoutes");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(express.json());
app.use(userRouter);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  console.log("test");
  res.json({
    message: "Hello! From kelompok 5",
  });
});

const PORT = 4000;

association()
  .then(() => {
    app.listen(PORT);
    console.log("Connected to Database! in port 4000");
  })
  .catch((e) => {
    console.log(e);
  });
