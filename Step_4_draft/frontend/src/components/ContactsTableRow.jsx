import DeleteContactForm from './DeleteContactForm';

const ContactsTableRow = ({ rowObject, backendURL, refreshContacts }) => {
    return (
        <tr>
            {Object.entries(rowObject).map(([key, value], index) => (
                <td key={index}>{value}</td>
            ))}
            <DeleteContactForm rowObject={rowObject} backendURL={backendURL} refreshContacts={refreshContacts} />
        </tr>
    );
};

export default ContactsTableRow;