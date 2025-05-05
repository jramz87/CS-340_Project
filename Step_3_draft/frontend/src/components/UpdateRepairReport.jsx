import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function UpdateRepairReport({ report, storepersonnel, bikes, backendURL, refreshRepairReports, onClose }) {
    // State to hold the form data
    const [formData, setFormData] = useState({
        repairID: report.repairID,
        personnelID: report.personnelID,
        dateRepaired: formatDate(report.dateRepaired),
        hoursSpent: report.hoursSpent,
        description: report.description,
        bikeID: report.bikeID
    });

    // Format the date string to YYYY-MM-DD format for input type="date"
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'hoursSpent' ? parseFloat(value) : 
                    (name === 'personnelID' || name === 'bikeID') ? 
                    (value === '' ? null : parseInt(value)) : value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`${backendURL}/repairreports/${report.repairID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Refresh the repair reports list
                refreshRepairReports();
                // Close the form
                onClose();
            } else {
                console.error('Failed to update repair report');
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
                            value={formData.personnelID || ''}
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
                            value={formData.bikeID || ''}
                            onChange={handleChange}
                        >
                            <option value="">None</option>
                            {bikes.map(bike => (
                                <option key={bike.bikeID} value={bike.bikeID}>
                                    {bike.color} {bike.style} (Received: {new Date(bike.dateReceived).toLocaleDateString()})
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