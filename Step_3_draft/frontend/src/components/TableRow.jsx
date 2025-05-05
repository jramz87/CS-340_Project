// Citation for the code below (4/30/2025):
// The code here was based on the the starter code provided in Module 6, Exploration "Web Application Technology" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

// Citation for delete/edit buttons (5/2/2025):
// Button functionality was adapted from Jessica Ramirez's portfolio project for CS290 from Winter 2025:
// https://github.com/jramz87/CS290_Portfolio_Project

import { VscEdit, VscTrash } from "react-icons/vsc";
import '../App.css';

const TableRow = ({ rowObject, onDelete, onEdit }) => {
        // Handler for edit button click
        const handleEdit = (e) => {
            e.preventDefault();
            if (onEdit) {
                onEdit(rowObject);
            }
        };
        
        // Handler for delete button click
        const handleDelete = (e) => {
            e.preventDefault();
            if (onDelete) {
                if (window.confirm(`Are you sure you want to delete this repair report?`)) {
                    onDelete(rowObject.id);
                }
            }
        };

            // Format date strings
        const formatDate = (dateString) => {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
        };
    
        // Format cell values based on their key
        const formatCellValue = (key, value) => {
            if (value === null || value === undefined) return '';
            
            // Check if the key contains 'date' in a case-insensitive way
            if (key.toLowerCase().includes('date') && typeof value === 'string') {
                return formatDate(value);
            }
            
            return value;
        };
    
    return (
        <tr>
            {Object.entries(rowObject).map(([key, value], index) => (
                <td key={index}>{formatCellValue(key, value)}</td>
            ))}
            <td>
                <VscEdit className="edit-button" onClick={handleEdit}/>
                <VscTrash className="delete-button" onClick={handleDelete}/>
            </td>
        </tr>
    );
};

export default TableRow;