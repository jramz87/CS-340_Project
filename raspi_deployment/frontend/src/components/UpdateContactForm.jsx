// Citation for the code below (5/14/2025):
// The code here was based on the the starter code provided in Module 8, Exploration "Implementing CUD operations in your app" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

// Citation for the code below (5/21/2025):
// The form validation code here was based on GenAI: chatgpt
// Prompt: "Write me a React component that will validate the phone number and email in form" 

import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


function UpdateContactForm({ contact, backendURL, refreshContacts, onClose }) {
    // Check and log the received contact data to help with debugging
    useEffect(() => {
        console.log("Contact data received in update form:", contact);
    }, [contact]);

    // State to hold the form data - handle both original field names and display field names
    const [formData, setFormData] = useState({
        contactID: contact["Contact ID"] || contact.contactID,
        firstName: contact["First Name"] || contact.firstName,
        lastName: contact["Last Name"] || contact.lastName,
        phone: contact["Phone"] || contact.phone,
        email: contact["Email"] || contact.email
    });

    const [errors, setErrors] = useState({
        phone: '',
        email: ''
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let valid = true;
        let newErrors = { phone: '', email: '' };
    
        if (!phonePattern.test(formData.phone)) {
            newErrors.phone = 'Phone number must be in the format 123-456-7890.';
            valid = false;
        }
    
        if (!emailPattern.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
            valid = false;
        }
    
        setErrors(newErrors);
        return valid;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        try {
            const response = await fetch(`${backendURL}/contacts/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Refresh the contacts list
                refreshContacts();
                // Close the form
                onClose();
            } else {
                console.error('Failed to update contact');
            }
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            isInvalid={!!errors.phone}
                            required
                        />
                        <Form.Text className="text-muted">
                            Format: 123-456-7890
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            {errors.phone}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default UpdateContactForm;