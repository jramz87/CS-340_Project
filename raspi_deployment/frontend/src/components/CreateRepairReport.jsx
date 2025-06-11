//Citation for the code below (5/1/2025):
// The code here was based on the the starter code provided in Module 6, Exploration "Web Application Technology" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

import { useState, useEffect } from 'react';
import { Form, Button, Container, CloseButton } from 'react-bootstrap';
import '../App.css';

const CreateRepairReport = ({ storepersonnel, bikes, backendURL, refreshRepairReports, onClose }) => {
    // Debug logging
    useEffect(() => {
        console.log("CreateRepairReport received bikes:", bikes);
        if (bikes && bikes.length > 0) {
            console.log("First bike object:", bikes[0]);
        }
    }, [bikes]);

    // Ensure arrays are defined
    const personnelArray = Array.isArray(storepersonnel) ? storepersonnel : [];
    const bikesArray = Array.isArray(bikes) ? bikes : [];

    // State to store form data
    const [formData, setFormData] = useState({
        personnelID: '',
        dateRepaired: '',
        hoursSpent: '',
        bikeID: '',
        description: ''
    });

    // Clean up date formatting
    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return '';
            }
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${month}-${day}-${year}`;
        } catch (error) {
            console.error("Error formatting date:", error);
            return '';
        }
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        let processedValue;
        if (name === 'hoursSpent') {
            processedValue = value === '' ? '' : parseFloat(value);
        } else if (name === 'personnelID' || name === 'bikeID') {
            processedValue = value === '' ? null : parseInt(value, 10);
        } else {
            processedValue = value;
        }
        
        setFormData({
            ...formData,
            [name]: processedValue
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form data
        if (!formData.personnelID) {
            alert('Please select a person.');
            return;
        }
        
        if (!formData.dateRepaired) {
            alert('Please select a date.');
            return;
        }
        
        if (!formData.hoursSpent || formData.hoursSpent <= 0) {
            alert('Please enter a valid number of hours.');
            return;
        }
        
        if (!formData.description) {
            alert('Please enter a description.');
            return;
        }
        
        // Log what we're about to submit
        console.log("Submitting repair report:", formData);
        
        try {
            const response = await fetch(`${backendURL}/repairreports`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                refreshRepairReports();
                onClose();
            } else {
                const errorText = await response.text();
                console.error('Failed to create repair report:', errorText);
                alert('Failed to create repair report. Please try again.');
            }
        } catch (error) {
            console.error('Error creating repair report:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <>
        <Container className="p-0">
            <div className="form-container p-4 mb-4 border rounded bg-light">
                
                <div className="position-relative p-3 border-bottom">
                    <h3 className="text-center m-0">Enter Repair Report Details</h3>
                    <CloseButton onClick={onClose} className="position-absolute top-0 end-0 mt-3 me-3"/>
                </div>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="create_rreport_personnel">
                        <Form.Label>Person Making Report:</Form.Label>
                        <Form.Select 
                            name="personnelID"
                            value={formData.personnelID || ''}
                            onChange={handleChange}
                            className="text-center"
                            required
                        >
                            <option value="">Select a Person</option>
                            {personnelArray.map((person, index) => (
                                <option value={person.personnelID} key={person.personnelID || index}>
                                    {person.firstName} {person.lastName} ({person.role})
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="create_rreport_date">
                        <Form.Label>Date of Work:</Form.Label>
                        <Form.Control 
                            type="date" 
                            name="dateRepaired"
                            value={formData.dateRepaired}
                            onChange={handleChange}
                            className="text-center"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="create_rreport_hours">
                        <Form.Label>Time Required (hours):</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="hoursSpent"
                            value={formData.hoursSpent}
                            onChange={handleChange}
                            className="text-center"
                            step="0.25"
                            min="0.25"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="create_rreport_bikes">
                        <Form.Label>Choose a Bike:</Form.Label>
                        <Form.Select 
                            name="bikeID"
                            value={formData.bikeID || ''}
                            onChange={handleChange}
                            className="text-center"
                        >
                            <option value="">None (General Work)</option>
                            {bikesArray.length > 0 ? (
                                bikesArray.map((bike, index) => (
                                    <option value={bike.bikeID} key={bike.bikeID || index}>
                                        {bike.color} {bike.style} (Received: {formatDate(bike.dateReceived)})
                                    </option>
                                ))
                            ) : (
                                <option disabled>No bikes available</option>
                            )}
                        </Form.Select>
                        {bikesArray.length === 0 && (
                            <Form.Text className="text-warning">
                                No bikes are currently in "In Repair" or "In Review" status.
                            </Form.Text>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="create_rreport_description">
                        <Form.Label>Description of Work:</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            required
                        />
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

export default CreateRepairReport;