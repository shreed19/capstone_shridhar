const express = require("express");
const path = require("path");
const app = express();
const port = 3000;


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(express.static("public"));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.get("/previous-tasks", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "previous-tasks.html"));
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
