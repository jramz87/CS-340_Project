// Citation for the code below (4/30/2025):
// The code here was adapted from the the starter code provided in Module 6, Exploration "Web Application Technology" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import CreateContactForm from '../components/CreateContactForm';
import UpdateContactForm from '../components/UpdateContactForm';
import { VscAdd } from "react-icons/vsc";
import Button from 'react-bootstrap/Button';
import '../App.css';

function Contacts({ backendURL }) {

        // Set up a state variable `bikes` to store and display the backend response
        const [contacts, setContacts] = useState([]);
        const [displayCreateForm, setDisplayCreateForm] = useState(false);
        const [editingContact, setEditingContact] = useState(null);

        const getData = async function () {
            try {
                // Make a GET request to the backend
                const response = await fetch(backendURL + '/contacts');
                
                // Convert the response into JSON format
                const {contacts} = await response.json();
        
                // Update the bikes state with the response data
                setContacts(contacts);
                
            } catch (error) {
              // If the API call fails, print the error to the console
              console.log(error);
            }
    
        };

        // Load table on page load
        useEffect(() => {
            getData();
        }, []);

        // Handler to close the create form
        const handleCloseForm = () => {
            setDisplayCreateForm(false);
        };

        // Handler for opening the edit form
        const handleEdit = (contact) => {
            setEditingContact(contact);
        };

        // Handler for closing the edit form
        const handleCloseEditForm = () => {
            setEditingContact(null);
        };

        // Handler for deleting a report
        const handleDelete = async (contactId) => {
            try {
                const response = await fetch(`${backendURL}/contacts/${contactId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Refresh the data after deletion
                    getData();
                } else {
                    console.error('Failed to delete contact');
                }
            } catch (error) {
                console.error('Error deleting contact:', error);
            }
        };


    return (
        <>
            <h1>Contacts Table</h1>

            <table>
                <thead>
                    <tr>
                        {contacts.length > 0 && Object.keys(contacts[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th> Edit / Delete </th>
                    </tr>
                </thead>

                <tbody>
                    {contacts.map((contact, index) => (
                        <TableRow rowObject={contact} onEdit={handleEdit} onDelete={handleDelete} showEditDelete={true} backendURL={backendURL} refreshContacts={getData}/>
                    ))}

                </tbody>
            </table>

            <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={() => setDisplayCreateForm(!displayCreateForm)}>
                    <VscAdd /> Add a Contact
                </Button>
            </div>

            {displayCreateForm && (
                <CreateContactForm contacts={contacts} backendURL={backendURL} refreshContacts={getData} onClose={handleCloseForm}/>
            )}

            {editingContact && (
                <UpdateContactForm 
                    contact={editingContact}
                    backendURL={backendURL} 
                    refreshContacts={getData} 
                    onClose={handleCloseEditForm}
                />
            )}
        </>
    );

}

export default Contacts;