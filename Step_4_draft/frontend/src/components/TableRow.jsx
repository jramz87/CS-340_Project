// Citation for the code below (4/30/2025):
// The code here was based on the the starter code provided in Module 6, Exploration "Web Application Technology" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

// Citation for delete/edit buttons (5/2/2025):
// Button functionality was adapted from Jessica Ramirez's portfolio project for CS290 from Winter 2025:
// https://github.com/jramz87/CS290_Portfolio_Project

import { VscEdit, VscTrash } from "react-icons/vsc";
import ExpandableDescription from './ExpandableDescription';
import DeleteContactForm from "./DeleteContactForm";
import '../App.css';
import { backendURL } from "../config";

const TableRow = ({ rowObject, onDelete, onEdit, showEditDelete = false, backendURL, refreshContacts}) => {
        // Handler for edit button click
        const handleEdit = (e) => {
            e.preventDefault();
            if (onEdit) {
                // Create a clean copy of rowObject for editing - ensure no React components are passed
                const editableData = JSON.parse(JSON.stringify(rowObject));
                onEdit(editableData);
            }
        };
        
        // Handler for delete button click
        const handleDelete = async (e) => {
            e.preventDefault();

            // Confirm deletion before proceeding
            const confirmed = window.confirm(`Are you sure you want to delete this record?`);
            if (confirmed) {
                const fullname = rowObject["First Name"] + ' ' + rowObject["Last Name"];
                const formData = {
                    delete_contact_id: rowObject["Contact ID"],
                    delete_contact_name: fullname,
                };
    
                try {
                    const response = await fetch(`${backendURL}/contacts/delete`, { // Use backendURL here
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData),
                    });
    
                    if (response.ok) {
                        console.log("Contact deleted successfully.");
                        refreshContacts(); // Refresh contacts list
                    } else {
                        console.error("Error deleting contact.");
                    }
                } catch (error) {
                    console.error('Error during delete operation:', error);
                }
            }
        };

        // Format date strings
        const formatDate = (dateString) => {
            if (!dateString) return '';
            try {
                const date = new Date(dateString);
                if (isNaN(date.getTime())) {
                    return dateString; // Return the original string if date is invalid
                }
                
                // Format as MM-DD-YYYY
                const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
                const day = date.getDate().toString().padStart(2, '0');
                const year = date.getFullYear();
                
                return `${month}-${day}-${year}`;
            } catch (error) {
                console.error("Error formatting date:", error, dateString);
                return dateString; // Return the original string if there's an error
            }
        };
    
        // Format cell values based on their key
        const formatCellValue = (key, value) => {
            if (value === null || value === undefined) return '';
            
            // Check if the key contains 'date' in a case-insensitive way
            if (key.toLowerCase().includes('date') && typeof value === 'string') {
                return formatDate(value);
            }
            
            // Use ExpandableDescription only for "Description" column
            if (key === "Description") {
                return <ExpandableDescription text={String(value)} />;
            }
            
            return value;
        };
    
    return (
        <tr>
            {Object.entries(rowObject).map(([key, value], index) => (
                <td key={index}>{formatCellValue(key, value)}</td>
            ))}
            {showEditDelete ? (
                <td>
                    <VscEdit className="edit-button" onClick={handleEdit}/>
                    <VscTrash className="delete-button" onClick={handleDelete}/>
                    
                </td>
            ) : (
                <td></td>
            )}
        </tr>
    );
};

export default TableRow;