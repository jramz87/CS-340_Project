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
        <td>
            <VscTrash className="delete-button" onClick={handleSubmit}/>
        </td>
    );
};

export default DeleteContactForm;
