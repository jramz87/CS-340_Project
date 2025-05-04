// Citation for the code below (4/30/2025):
// The code here was based on the the starter code provided in Module 6, Exploration "Web Application Technology" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

// Citation for delete/edit buttons (5/2/2025):
// Button functionality was adapted from Jessica Ramirez's portfolio project for CS290 from Winter 2025:
// https://github.com/jramz87/CS290_Portfolio_Project

import { VscEdit, VscTrash } from "react-icons/vsc";
import '../App.css';

const TableRow = ({ rowObject, onDelete, onEdit }) => {
    
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            <td>
                <VscEdit className="edit-button" onClick={e => onEdit(rowObject)}/>
                <VscTrash className="delete-button" onClick={e => onDelete(rowObject.id)}/>
            </td>
        </tr>
    );
};

export default TableRow;