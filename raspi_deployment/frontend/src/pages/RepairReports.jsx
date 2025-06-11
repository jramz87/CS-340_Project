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
    // Set up state variables to store and display the backend response
    const [repairreports, setRepairreports] = useState([]);
    const [storepersonnel, setStorepersonnel] = useState([]);
    const [bikes, setBikes] = useState([]);
    const [allBikes, setAllBikes] = useState([]);
    const [displayCreateForm, setDisplayCreateForm] = useState(false);
    const [editingReport, setEditingReport] = useState(null);

    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/repairreports', {
                headers: {'ngrok-skip-browser-warning': 'true'}
            });
            
            // Convert the response into JSON format
            const { repairreports, storepersonnel, bikes, allBikes } = await response.json();
    
            // Update the state with the response data
            setRepairreports(repairreports);
            setStorepersonnel(storepersonnel);
            setBikes(bikes);
            setAllBikes(allBikes);
            
        } catch (error) {
            // If the API call fails, print the error to the console
            console.log(error);
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

    return (
        <>
            <h1>Repair Reports Table:</h1>

            <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={() => setDisplayCreateForm(!displayCreateForm)}>
                    <VscAdd /> Add a Repair Report
                </Button>
            </div>

            {displayCreateForm && (
                <CreateRepairReport 
                    storepersonnel={storepersonnel} 
                    bikes={bikes} 
                    backendURL={backendURL} 
                    refreshRepairReports={getData} 
                    onClose={handleCloseForm}
                />
            )}

            {editingReport && (
                <UpdateRepairReport 
                    report={editingReport}
                    storepersonnel={storepersonnel}
                    bikes={allBikes}
                    backendURL={backendURL} 
                    refreshRepairReports={getData} 
                    onClose={handleCloseEditForm}
                />
            )}

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
                    {repairreports.map((report, index) => (
                        <RepairReportTableRow 
                            key={index}
                            onEdit={handleEdit} 
                            rowObject={report} 
                            backendURL={backendURL} 
                            refreshReports={getData}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default RepairReports;