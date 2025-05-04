// Citation for the code below (4/30/2025):
// The code here was adapted from the the starter code provided in Module 6, Exploration "Web Application Technology" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import CreateBikeForm from '../components/CreateBikeForm';
import { VscAdd } from "react-icons/vsc";
import Button from 'react-bootstrap/Button';
import '../App.css';

function Bikes({ backendURL }) {

        // Set up a state variable `bikes` to store and display the backend response
        const [bikes, setBikes] = useState([]);
        const [displayCreateForm, setDisplayCreateForm] = useState(false); 

        const getData = async function () {
            try {
                // Make a GET request to the backend
                const response = await fetch(backendURL + '/bikes');
                
                // Convert the response into JSON format
                const {bikes} = await response.json();
        
                // Update the bikes state with the response data
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
            <h1>Bikes Table</h1>

            <table>
                <thead>
                    <tr>
                        {bikes.length > 0 && Object.keys(bikes[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th> Edit / Delete </th>
                    </tr>
                </thead>

                <tbody>
                    {bikes.map((bike, index) => (
                        <TableRow key={index} rowObject={bike} backendURL={backendURL}/>  // removed refresh code
                    ))}

                </tbody>
            </table>

            <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={() => setDisplayCreateForm(!displayCreateForm)}>
                    <VscAdd /> Add a Bike
                </Button>
            </div>

            {displayCreateForm && (
                <CreateBikeForm bikes={bikes} backendURL={backendURL} refreshBikes={getData} onClose={handleCloseForm}/>
            )}
        </>
    );

}

export default Bikes;