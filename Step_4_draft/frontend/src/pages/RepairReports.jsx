// Citation for the code below (4/30/2025):
// The code here was adapted from the the starter code provided in Module 6, Exploration "Web Application Technology" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

import { useState, useEffect } from 'react';
import RepairReportTableRow from '../components/RepairReportTableRow';
import CreateRepairReport from '../components/CreateRepairReport';
import UpdateRepairReport from '../components/UpdateRepairReport';
import { VscAdd } from "react-icons/vsc";
import Button from 'react-bootstrap/Button';
import '../App.css';

function RepairReports({ backendURL }) {
    // State variables
    const [repairreports, setRepairReports] = useState([]);
    const [storepersonnel, setStorePersonnel] = useState([]);
    const [bikes, setBikes] = useState([]);
    const [allBikes, setAllBikes] = useState([]);
    const [displayCreateForm, setDisplayCreateForm] = useState(false);
    const [editingReport, setEditingReport] = useState(null);

    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/repairreports');
            
            // Convert the response into JSON format
            const data = await response.json();
            
            // Debug logging
            console.log("API response:", data);
    
            // Update the state with the response data
            setRepairReports(data.repairreports || []);
            setStorePersonnel(data.storepersonnel || []);
            setBikes(data.bikes || []);
            setAllBikes(data.allBikes || []);
            
        } catch (error) {
            // If the API call fails, print the error to the console
            console.log("Error fetching repair reports data:", error);
        }
    };

    // Load table on page load
    useEffect(() => {
        getData();
    }, []);

    // Handler to close the create form
    const handleCloseForm = () => {
        setDisplayCreateForm(false);
    };

    // Handler for opening the edit form
    const handleEdit = (report) => {
        setEditingReport(report);
    };

    // Handler for closing the edit form
    const handleCloseEditForm = () => {
        setEditingReport(null);
    };

    // Handler for deleting a report
    const handleDelete = async (reportId) => {
        try {
            const response = await fetch(`${backendURL}/repairreports/${reportId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Refresh the data after deletion
                getData();
            } else {
                console.error('Failed to delete repair report');
            }
        } catch (error) {
            console.error('Error deleting repair report:', error);
        }
    };

    // Log state for debugging
    useEffect(() => {
        console.log("Current state - bikes:", bikes);
        console.log("Current state - allBikes:", allBikes);
    }, [bikes, allBikes]);

    return (
        <>
            <h1>Repair Reports Table</h1>

            <table>
                <thead>
                    <tr>
                        {repairreports.length > 0 && Object.keys(repairreports[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th> Edit / Delete </th>
                    </tr>
                </thead>

                <tbody>
                    {repairreports.map((repairreport, index) => (
                        <RepairReportTableRow  
                            key={repairreport["Repair ID"] || index}
                            rowObject={repairreport}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            backendURL={backendURL}
                            refreshReports={getData}
                            showEditDelete={true}
                        />
                    ))}
                </tbody>
            </table>

            <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={() => setDisplayCreateForm(!displayCreateForm)}>
                    <VscAdd /> Create a Repair Record
                </Button>
            </div>

            {displayCreateForm && (
                <CreateRepairReport 
                    storepersonnel={storepersonnel} 
                    bikes={bikes} // Use filtered bikes for new reports
                    backendURL={backendURL} 
                    refreshRepairReports={getData} 
                    onClose={handleCloseForm}
                />
            )}

            {editingReport && (
                <UpdateRepairReport 
                    report={editingReport}
                    storepersonnel={storepersonnel} 
                    bikes={allBikes} // Use ALL bikes for editing
                    backendURL={backendURL} 
                    refreshRepairReports={getData} 
                    onClose={handleCloseEditForm}
                />
            )}
        </>
    );
}

export default RepairReports;