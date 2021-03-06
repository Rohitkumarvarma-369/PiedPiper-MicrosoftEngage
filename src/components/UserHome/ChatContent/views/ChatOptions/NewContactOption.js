import React, { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../../CommonStates/ContactsContext";

export default function NewContactModal({ closeModal }) {
  const idRef = useRef();
  const nameRef = useRef();
  const { createContact } = useContacts();

  function handleSubmit(e) {
    e.preventDefault();

    if (!idRef.current.value || !nameRef.current.value) {
      console.log("add values");
      return;
    }

    createContact(idRef.current.value, nameRef.current.value);
    closeModal();
  }

  return (
    <>
      <Modal.Header closeButton>Create New Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control
              type="text"
              ref={idRef}
              placeholder="Enter your friend contactID"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              ref={nameRef}
              placeholder="Enter your friend Name"
              required
            />
          </Form.Group>
          <div className="text-center mt-4">
            <Button type="submit" className="button w-100">
              Create
            </Button>
          </div>
        </Form>
      </Modal.Body>

    </>
  );
}
