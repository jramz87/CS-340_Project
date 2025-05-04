// Citation for the code below (4/30/2025):
// The code here was adapted from the the starter code provided in Module 6, Exploration "Web Application Technology" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import CreateRepairReport from '../components/CreateRepairReport';
import { VscAdd } from "react-icons/vsc";
import Button from 'react-bootstrap/Button';
import '../App.css';

function RepairReports({ backendURL }) {

        // Set up a state variable `bikes` to store and display the backend response
        const [repairreports, setRepairReports] = useState([]);
        const [storepersonnel, setStorePersonnel] = useState([]);
        const [bikes, setBikes] = useState([]);
        const [displayCreateForm, setDisplayCreateForm] = useState(false); 

        const getData = async function () {
            try {
                // Make a GET request to the backend
                const response = await fetch(backendURL + '/repairreports');
                
                // Convert the response into JSON format
                const {repairreports, storepersonnel, bikes} = await response.json();
        
                // Update the bikes state with the response data
                setRepairReports(repairreports);
                setStorePersonnel(storepersonnel);
                setBikes(bikes);
                
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
                        <TableRow key={index} rowObject={repairreport}/>
                    ))}

                </tbody>
            </table>

            <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={() => setDisplayCreateForm(!displayCreateForm)}>
                    <VscAdd /> Create a Repair Record
                </Button>
            </div>

            {displayCreateForm && (
                <CreateRepairReport storepersonnel={storepersonnel} bikes={bikes} backendURL={backendURL} refreshRepairReports={getData} onClose={handleCloseForm}/>
            )}
        </>
    );

}

export default RepairReports;