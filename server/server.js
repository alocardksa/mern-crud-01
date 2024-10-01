// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 500;
const router = require("./routes/routes");
const connectDB = require("./database/db");
require("dotenv").config();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

app.use(router);

// Connect to database before starting the server
connectDB().then(() => {
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
