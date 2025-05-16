// Citation for the code below (5/14/2025):
// The code here was based on the the starter code provided in Module 8, Exploration "Implementing CUD operations in your app" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

import { VscTrash } from "react-icons/vsc";

const DeleteContactForm = ({ rowObject, backendURL, refreshContacts }) => {
    const fullname = rowObject["First Name"] + ' ' + rowObject["Last Name"];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            delete_contact_id: rowObject["Contact ID"],
            delete_contact_name: fullname,
        };

        try {
            const response = await fetch(`${backendURL}/contacts/delete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Contact deleted successfully.");
                refreshContacts();
            } else {
                console.error("Failed to delete contact.");
            }
        } catch (error) {
            console.error('Error during delete operation:', error);
        }
    };

    return (
        <VscTrash className="delete-button" onClick={handleSubmit}/>
    );
};

export default DeleteContactForm;
