// Citation for the code below (5/14/2025):
// The code here was based on the the starter code provided in Module 8, Exploration "Implementing CUD operations in your app" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

import { VscEdit } from "react-icons/vsc";

import DeleteContactForm from './DeleteContactForm';

const ContactsTableRow = ({ rowObject, onEdit, backendURL, refreshContacts }) => {
            // Handler for edit button click
            const handleEdit = (e) => {
                e.preventDefault();
                if (onEdit) {
                    // Create a clean copy of rowObject for editing - ensure no React components are passed
                    const editableData = JSON.parse(JSON.stringify(rowObject));
                    onEdit(editableData);
                }
            };

    return (
        <tr>
            {Object.entries(rowObject).map(([key, value], index) => (
                <td key={index}>{value}</td>
            ))}
            <td>
                <VscEdit className="edit-button" onClick={handleEdit} />
                <DeleteContactForm rowObject={rowObject} backendURL={backendURL} refreshContacts={refreshContacts} />
            </td>
        </tr>
    );
};

export default ContactsTableRow;