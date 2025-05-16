// Citation for the code below (4/30/2025):
// The code here was based on the the starter code provided in Module 6, Exploration "Web Application Technology" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

import ExpandableDescription from './ExpandableDescription';
import '../App.css';

const TableRow = ({ rowObject, children }) => {
    // Citation for the code below:
    // The styling below was based on GenAI: claude.ai
    // Prompt: "Write a function to convert SQL datetime data into MM-DD-YYYY format"
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
            {children ? (
                <td>
                    {children}
                </td>
            ) : null}
        </tr>
    );
};

export default TableRow;