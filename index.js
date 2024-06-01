const express = require("express");
const path = require("path");

const app = express();
const port = 8080;

// Set the static directory for serving files
const staticDirectory = path.join(__dirname);

// Serve static files
app.use(express.static(staticDirectory));

// Handle the root route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(staticDirectory, "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
