// Citation for the code below (4/30/2025):
// The code here was adapted from the the starter code provided in Module 6, Exploration "Web Application Technology" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import '../App.css';

function Customers({ backendURL }) {

        // Set up a state variable `bikes` to store and display the backend response
        const [customers, setCustomers] = useState([]);

        const getData = async function () {
            try {
                // Make a GET request to the backend
                const response = await fetch(backendURL + '/customers');
                
                // Convert the response into JSON format
                const {customers} = await response.json();
        
                // Update the bikes state with the response data
                setCustomers(customers);
                
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
            <h1>Customers Table:</h1>

            <table>
                <thead>
                    <tr>
                        {customers.length > 0 && Object.keys(customers[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {customers.map((customer, index) => (
                        <TableRow rowObject={customer} showEditDelete={false}/>  // removed refresh code
                    ))}

                </tbody>
            </table>
        </>
    );

}

export default Customers;