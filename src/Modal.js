import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EmployeeModal = ({ show, handleClose, saveEmployee, employee }) => {
  const [name, setName] = useState(employee?.name || "");
  const [contact, setContact] = useState(employee?.contact || "");
  const [address, setAddress] = useState(employee?.address || "");
  const [designation, setDesignation] = useState(employee?.designation || "");
  const [dateCreated, setDate] = useState(employee?.dateCreated || "");

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setContact(employee.contact);
      setAddress(employee.address);
      setDesignation(employee.designation);
      setDate(employee.dateCreated);
    }
  }, [employee]);

  const handleSave = () => {
    saveEmployee({
      name,
      address,
      contact,
      designation,
      dateCreated,
      _id: employee?._id,
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>
          {employee ? "Edit Employee" : "Add New Employee"}
        </Modal.Title>
        <button className="button-modal" onClick={handleClose}>
          X
        </button>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formContact">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDesignation">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              placeholder="Enter designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeModal;
