// Citation for the code below (5/14/2025):
// The code here was based on the the starter code provided in Module 8, Exploration "Implementing CUD operations in your app" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

import { VscTrash } from "react-icons/vsc";

const DeleteRepairReportForm = ({ rowObject, backendURL, refreshReports }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(rowObject);
        console.log(backendURL);
        console.log(rowObject["Repair ID"])
        const formData = {
            delete_repair_id: rowObject["Repair ID"],
        };

        try {
            const response = await fetch(`${backendURL}/repairreports/delete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Repair Report deleted successfully.");
                refreshReports();
            } else {
                console.error("Failed to delete Repair Report.");
            }
        } catch (error) {
            console.error('Error during delete operation:', error);
        }
    };

    return (
        <VscTrash className="delete-button" onClick={handleSubmit}/>
    );
};

export default DeleteRepairReportForm;
