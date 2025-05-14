// Citation for the code below (4/30/2025):
// The code here was adapted from the the starter code provided in Module 6, Exploration "Web Application Technology" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import '../App.css';

function Bikes({ backendURL }) {

        // Set up a state variable `bikes` to store and display the backend response
        const [bikes, setBikes] = useState([]);

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

    return (
        <>
            <h1>Bikes Table</h1>

            <table>
                <thead>
                    <tr>
                        {bikes.length > 0 && Object.keys(bikes[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {bikes.map((bike, index) => (
                        <TableRow rowObject={bike} showEditDelete={false}/>  // removed refresh code
                    ))}

                </tbody>
            </table>
        </>
    );

}

export default Bikes;