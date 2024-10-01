// controller.js
const employee = require("../model/model");

const createEmployee = async (req, res) => {
  const newEmployee = new employee(req.body);
  await newEmployee.save();
  res.json(newEmployee);
};

const getEmployees = async (req, res) => {
  const employees = await employee.find();
  res.json(employees);
};

const updateEmployee = async (req, res) => {
  const updatedEmployee = await employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json(updatedEmployee);
};

const deleteEmployee = async (req, res) => {
  await employee.findByIdAndDelete(req.params.id);
  res.json({ message: "employee deleted" });
};

module.exports = {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};
