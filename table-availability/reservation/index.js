// reservation/index.js

const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3002;

app.use(express.json());

const { waitlists, customers } = require("./data");
let { reservationCounter } = require("./data");

// Helper: Get table details
async function getTable(tableId) {
  try {
    const res = await axios.get(`http://localhost:3001/tables/${tableId}`);
    return res.data;
  } catch {
    return null;
  }
}

// Helper: Update table availability
async function updateTableAvailability(tableId, available) {
  try {
    await axios.put(`http://localhost:3001/tables/${tableId}`, { available });
    return true;
  } catch {
    return false;
  }
}

// POST /reservations
app.post("/reservations", async (req, res) => {
  const { tableId, customerId, reservationType, preferences } = req.body;

  const table = await getTable(tableId);
  if (!table) {
    return res.status(404).json({ error: "Table not found" });
  }

  if (!["reserve", "cancel"].includes(reservationType)) {
    return res.status(400).json({ error: "Invalid reservation type" });
  }

  if (reservationType === "reserve") {
    if (table.available) {
      await updateTableAvailability(tableId, false);
      return res.json({
        reservationId: `R${String(reservationCounter++).padStart(3, "0")}`,
        status: "success",
        tableId,
      });
    } else {
      if (!waitlists[tableId]) waitlists[tableId] = [];
      waitlists[tableId].push({ customerId, preferences });
      const position = waitlists[tableId].length;
      return res.json({
        reservationId: null,
        status: "waitlisted",
        waitlistMessage: `You are #${position} in the queue.`,
      });
    }
  } else if (reservationType === "cancel") {
    if (waitlists[tableId] && waitlists[tableId].length > 0) {
      const next = waitlists[tableId].shift(); // fulfill next in queue
      return res.json({
        reservationId: `R${String(reservationCounter++).padStart(3, "0")}`,
        status: "fulfilled_from_waitlist",
        customerId: next.customerId,
        tableId,
      });
    } else {
      await updateTableAvailability(tableId, true);
      return res.json({
        reservationId: null,
        status: "cancelled",
        tableId,
      });
    }
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Reservation Microservice running on port ${PORT}`);
});
