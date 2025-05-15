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