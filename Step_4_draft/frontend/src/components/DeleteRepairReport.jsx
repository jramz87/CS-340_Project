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
