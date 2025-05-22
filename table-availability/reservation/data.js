// reservation/data.js

const waitlists = {}; // e.g. { T002: [ { customerId, preferences } ] }

let reservationCounter = 1;

const customers = [
  { customerId: "C101", name: "John Doe", email: "john.doe@example.com" },
  { customerId: "C102", name: "Jane Smith", email: "jane.smith@example.com" },
  { customerId: "C103", name: "Sam Wilson", email: "sam.wilson@example.com" },
  { customerId: "C104", name: "Emily Davis", email: "emily.davis@example.com" },
];

module.exports = { waitlists, customers, reservationCounter };
