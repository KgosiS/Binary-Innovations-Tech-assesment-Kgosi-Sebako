// table-availability/index.js

const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

let tables = require("./data");

// GET /tables/:tableId
app.get("/tables/:tableId", (req, res) => {
  const table = tables.find(t => t.tableId === req.params.tableId);
  if (!table) {
    return res.status(404).json({ error: "Table not found" });
  }
  res.json(table);
});

// PUT /tables/:tableId
app.put("/tables/:tableId", (req, res) => {
  const table = tables.find(t => t.tableId === req.params.tableId);
  if (!table) {
    return res.status(404).json({ error: "Table not found" });
  }

  const { available } = req.body;
  if (typeof available !== "boolean") {
    return res.status(400).json({ error: "Invalid availability value" });
  }

  table.available = available;
  res.json(table);
});

// This starts the server
app.listen(PORT, () => {
  console.log(`Table Availability Microservice running on port ${PORT}`);
});
