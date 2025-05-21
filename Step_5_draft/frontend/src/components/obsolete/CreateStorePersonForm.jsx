//Citation for the code below (5/1/2025):
// The code here was based on the the starter code provided in Module 6, Exploration "Web Application Technology" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

import { Form, Button, Container, CloseButton } from 'react-bootstrap';
import '../App.css';

const CreateStorePersonForm = ({ storepersonnel, backendURL, refreshStorePersonnel, onClose }) => {

    return (
        <>
        <Container className="p-0">
            <div className="form-container p-4 mb-4 border rounded bg-light">
                
                <div className="position-relative p-3 border-bottom">
                    <h3 className="text-center m-0">Enter Store Person Details</h3>
                    <CloseButton onClick={onClose} className="position-absolute top-0 end-0 mt-3 me-3"/>
                </div>

                <Form>
                    <Form.Group className="mb-3" controlId="create_contact_id">
                        <Form.Label>Contact ID:</Form.Label>
                        <Form.Control type="number" className="text-center"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="create_contact_email">
                        <Form.Label>Role:</Form.Label>
                        <Form.Control type="text" className="text-center"/>
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

export default CreateStorePersonForm;