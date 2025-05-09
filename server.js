const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Serve static files from the public directory
app.use(express.static("public"));

// Serve index.html for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve previous-tasks.html
app.get("/previous-tasks", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "previous-tasks.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
