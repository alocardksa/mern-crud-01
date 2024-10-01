// route.js
const express = require("express");
const router = express.Router();
const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controller/controller");

router.get("/", (req, res) => {
  res.send("Hello, World!");
});

router.post("/employees", createEmployee);
router.get("/employees", getEmployees);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);

module.exports = router;
