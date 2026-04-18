const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());

// Read data from JSON file
function getTransactions() {
  const data = fs.readFileSync("data.json");
  return JSON.parse(data);
}

// API
app.get("/transactions", (req, res) => {
  const transactions = getTransactions();
  res.json(transactions);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});