import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import EmployeeModal from "./Modal";

function App() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [reset, setReset] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:500/employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error(error));
  }, []);

  const openModalNew = (employee = null) => {
    setCurrentEmployee(null);
    setIsModalOpen(true);
    setReset();
  };

  const openModalUpdate = (employee = null) => {
    setCurrentEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEmployee(null);
  };

  const saveEmployee = (employee) => {
    if (employee._id) {
      axios
        .put(`http://localhost:500/employees/${employee._id}`, employee)
        .then((response) => {
          setEmployees(
            employees.map((i) => (i._id === employee._id ? response.data : i))
          );
          closeModal();
        });
    } else {
      axios
        .post("http://localhost:500/employees", employee)
        .then((response) => {
          setEmployees([...employees, response.data]);
          closeModal();
        });
    }
  };

  const deleteEmployee = (id) => {
    axios
      .delete(`http://localhost:500/employees/${id}`)
      .then(() =>
        setEmployees(employees.filter((employee) => employee._id !== id))
      );
  };
  return (
    <div className="box-body">
      <div className="container">
        <div className="col-sm-">
          <h2 className="text">
            <b>Employee's</b> List
          </h2>
        </div>

        <Button className="right-button" onClick={() => openModalNew()}>
          Add New Employee
        </Button>
      </div>
      <br />
      <div className="scrollable-table">
        <table className="table table-hover">
          <thead className="head">
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Designation</th>
              <th>Date Created</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.contact}</td>
                <td>{employee.address}</td>
                <td>{employee.designation}</td>
                <td>{employee.dateCreated}</td>
                <td>
                  <Button
                    className="custom-warning-button"
                    onClick={() => openModalUpdate(employee)}
                  >
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="custom-button-icon"
                    />
                  </Button>
                </td>
                <td>
                  <Button
                    className="custom-danger-button"
                    onClick={() => deleteEmployee(employee._id)}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="custom-button-icon"
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EmployeeModal
        show={isModalOpen}
        handleClose={closeModal}
        saveEmployee={saveEmployee}
        employee={currentEmployee}
        openModalNew={reset}
      />
    </div>
  );
}

export default App;
