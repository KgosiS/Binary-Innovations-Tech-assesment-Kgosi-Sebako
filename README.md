# Binary Innovations Tech Assessment – Microservices Project

## 👋 Overview
This project demonstrates a microservices architecture for a **restaurant reservation system**, consisting of:

1. **Table Availability Microservice** – Manages table details and availability.
2. **Reservation Microservice** – Handles reservation requests, cancellations, and waitlist management.

The microservices communicate with each other via REST APIs.

---

## 🛠️ Technologies Used
- **Node.js + Express.js** for RESTful APIs
- **JavaScript** for service logic
- **Postman** for testing
- **JSON** for data handling
- **Git** + **GitHub** for version control

---

## 🔗 GitHub Repository
All source code is hosted here:  
👉 [https://github.com/KgosiS/Binary-Innovations-Tech-assesment-Kgosi-Sebako](https://github.com/KgosiS/Binary-Innovations-Tech-assesment-Kgosi-Sebako)

---

## 📦 Microservices Structure

### 1. Table Availability Microservice
- **GET /tables/:tableId** – Returns details of a specific table.
- **PUT /tables/:tableId** – Updates a table’s availability.

#### Sample Table Data
```json
{
  "tableId": "T001",
  "capacity": 4,
  "location": "Window",
  "available": true
}
