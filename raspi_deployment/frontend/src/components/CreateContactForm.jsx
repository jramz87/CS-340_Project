//Citation for the code below (5/1/2025):
// The code here was based on the the starter code provided in Module 6, Exploration "Web Application Technology" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

// Citation for the code below (5/21/2025):
// The form validation code here was based on GenAI: chatgpt
// Prompt: "Write me a React component that will validate the phone number and email in form" 

import { useState } from 'react';
import { Form, Button, Container, CloseButton } from 'react-bootstrap';
import '../App.css';

const CreateContactForm = ({ backendURL, refreshContacts, onClose }) => {
        const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
    });

    const [errors, setErrors] = useState({
        phone: '',
        email: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        // Map form field IDs to the state object keys
        const fieldMapping = {
            'create_contact_fname': 'firstName',
            'create_contact_lname': 'lastName',
            'create_contact_phone': 'phone',
            'create_contact_email': 'email'
        };
        
        setFormData({
            ...formData,
            [fieldMapping[id]]: value
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;
        
        try {
            const requestData = {
                firstNameInput: formData.firstName,
                lastNameInput: formData.lastName,
                phoneInput: formData.phone,
                emailInput: formData.email
            };

            const response = await fetch(`${backendURL}/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                refreshContacts();
                onClose();
            } else {
                const errorData = await response.json();
                console.error('Failed to create contact:', errorData);
                alert('Failed to create contact. Please try again.');
            }
        } catch (error) {
            console.error('Error creating contact:', error);
            alert('Error creating contact. Please try again.');
        }
    };

    return (
        <>
        <Container className="p-0">
            <div className="form-container p-4 mb-4 border rounded bg-light">
                
                <div className="position-relative p-3 border-bottom">
                    <h3 className="text-center m-0">Enter Contact Details</h3>
                    <CloseButton onClick={onClose} className="position-absolute top-0 end-0 mt-3 me-3"/>
                </div>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="create_contact_fname">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control 
                            type="text" 
                            className="text-center" 
                            onChange={handleChange} 
                            value={formData.firstName}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="create_contact_lname">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control 
                            type="text" 
                            className="text-center" 
                            onChange={handleChange} 
                            value={formData.lastName}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="create_contact_phone">
                        <Form.Label>Phone:</Form.Label>
                        <Form.Control 
                            type="tel" 
                            className="text-center" 
                            onChange={handleChange} 
                            value={formData.phone}
                            isInvalid={!!errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.phone}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="create_contact_email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control 
                            type="text" 
                            className="text-center" 
                            onChange={handleChange} 
                            value={formData.email}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
        </>
    );
};

export default CreateContactForm;