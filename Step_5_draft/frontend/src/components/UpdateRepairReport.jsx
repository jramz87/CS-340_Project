// Citation for the code below (5/14/2025):
// The code here was based on the the starter code provided in Module 8, Exploration "Implementing CUD operations in your app" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function UpdateRepairReport({ report, storepersonnel, bikes, backendURL, refreshRepairReports, onClose }) {
    // Debug logging
    useEffect(() => {
        console.log("Report data:", report);
        console.log("Available bikes:", bikes);
    }, [report, bikes]);

    // Safe format date function with error handling
    function formatDate(dateString) {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                console.warn("Invalid date:", dateString);
                return ''; // Return empty string for invalid dates
            }
            return date.toISOString().split('T')[0];
        } catch (error) {
            console.error("Error formatting date:", error);
            return ''; // Return empty string if there's an error
        }
    }

    // Find personnelID based on First Name and Last Name
    const findPersonnelID = () => {
        if (!storepersonnel || !report["First Name"] || !report["Last Name"]) return null;
        
        const matchedPersonnel = storepersonnel.find(
            staff => staff.firstName === report["First Name"] && 
                    staff.lastName === report["Last Name"]
        );
        
        return matchedPersonnel ? matchedPersonnel.personnelID : null;
    };

    // Extract the bikeID from the report
    const extractBikeID = () => {
        let bikeID = report["Bike Repaired"];
        
        if (bikeID === null || bikeID === undefined || bikeID === '') {
            return null;
        }
        
        // Ensure it's a number
        if (typeof bikeID === 'string') {
            bikeID = parseInt(bikeID, 10);
            if (isNaN(bikeID)) return null;
        }
        
        // Check if the bike exists in our list
        const bikeExists = bikes.some(bike => bike.bikeID === bikeID);
        console.log(`Bike ID ${bikeID} exists in bike list: ${bikeExists}`);
        
        return bikeID;
    };

    // Initialize form data
    const [formData, setFormData] = useState(() => {
        const repairID = report["Repair ID"];
        const personnelID = findPersonnelID();
        const bikeID = extractBikeID();
        
        return {
            repairID: repairID,
            personnelID: personnelID,
            dateRepaired: formatDate(report["Repair Date"]),
            hoursSpent: report["Hours"],
            description: report["Description"],
            bikeID: bikeID
        };
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        let processedValue;
        if (name === 'hoursSpent') {
            processedValue = value === '' ? 0 : parseFloat(value);
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
        
        console.log("Submitting form data:", formData);
        
        try {
            const response = await fetch(`${backendURL}/repairreports/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                refreshRepairReports();
                onClose();
            } else {
                console.error('Failed to update repair report');
                const errorText = await response.text();
                console.error('Server response:', errorText);
            }
        } catch (error) {
            console.error('Error updating repair report:', error);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Repair Report</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Date Repaired</Form.Label>
                        <Form.Control
                            type="date"
                            name="dateRepaired"
                            value={formData.dateRepaired}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Store Personnel</Form.Label>
                        <Form.Select
                            name="personnelID"
                            value={formData.personnelID === null ? '' : formData.personnelID}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Store Personnel</option>
                            {storepersonnel.map(staff => (
                                <option key={staff.personnelID} value={staff.personnelID}>
                                    {staff.firstName} {staff.lastName} ({staff.role})
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Bike</Form.Label>
                        <Form.Select
                            name="bikeID"
                            value={formData.bikeID === null ? '' : formData.bikeID}
                            onChange={handleChange}
                        >
                            <option value="">None</option>
                            {bikes.map(bike => (
                                <option key={bike.bikeID} value={bike.bikeID}>
                                    {bike.color} {bike.style} 
                                    {bike.status && `  [${bike.status}]  `} 
                                    (Received: {formatDate(bike.dateReceived)})
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Hours Spent</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.25"
                            name="hoursSpent"
                            value={formData.hoursSpent}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
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

export default UpdateRepairReport;