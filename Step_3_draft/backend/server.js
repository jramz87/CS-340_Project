// Citation for the code below (4/30/2025):
// The code here was based on the the starter code provided in Module 6, Exploration "Web Application Technology" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

// ########################################
// ########## SETUP

// Database
const db = require('./database/db-connector');

// Express
const express = require('express');
const app = express();

// Middleware
const cors = require('cors');
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests


const PORT = 7012;

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES

app.get('/bsg-people', async (req, res) => {
    try {
        // Create and execute our queries
        // In query1, we use a JOIN clause to display the names of the homeworlds
        const query1 = `SELECT bsg_people.id, bsg_people.fname, bsg_people.lname, \
            bsg_planets.name AS 'homeworld', bsg_people.age FROM bsg_people \
            LEFT JOIN bsg_planets ON bsg_people.homeworld = bsg_planets.id;`;
        const query2 = 'SELECT * FROM bsg_planets;';
        const [people] = await db.query(query1);
        const [homeworlds] = await db.query(query2);
    
        res.status(200).json({ people, homeworlds });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/bikes', async (req, res) => {
    try {
        // Create and execute our queries
        const query = 'SELECT * FROM Bikes;';
        const [bikes] = await db.query(query);
        res.status(200).json({ bikes });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/contacts', async (req, res) => {
    try {
        // Create and execute our queries
        const query = 'SELECT * FROM Contacts;';
        const [contacts] = await db.query(query);
        res.status(200).json({ contacts });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/customers', async (req, res) => {
    try {
        // Create and execute our queries
        const query = 'SELECT * FROM Customers;';
        const [customers] = await db.query(query);
        res.status(200).json({ customers });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/repairreports', async (req, res) => {
    try {
        // Create and execute our queries
        const query1 = 'SELECT * FROM RepairReports;';
        const query2 = 'SELECT StorePersonnel.personnelID, StorePersonnel.role, Contacts.firstName, Contacts.lastName \
                        FROM StorePersonnel \
                        INNER JOIN Contacts ON StorePersonnel.contactID = Contacts.contactID \
                        ORDER BY Contacts.contactID;';
        const query3 = 'SELECT Bikes.bikeID, Bikes.color, Bikes.style, Bikes.dateReceived FROM Bikes \
                        WHERE Bikes.status = "In Repair" OR Bikes.status = "In Review" \
                        ORDER BY Bikes.bikeID;';
        const [repairreports] = await db.query(query1);
        const [storepersonnel] = await db.query(query2);
        const [bikes] = await db.query(query3);
        res.status(200).json({ repairreports, storepersonnel, bikes });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/salesreports', async (req, res) => {
    try {
        // Create and execute our queries
        const query = 'SELECT * FROM SalesReports;';
        const [salesreports] = await db.query(query);
        res.status(200).json({ salesreports });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

app.get('/storepersonnel', async (req, res) => {
    try {
        // Create and execute our queries
        const query = 'SELECT * FROM StorePersonnel;';
        const [storepersonnel] = await db.query(query);
        res.status(200).json({ storepersonnel });  // Send the results to the frontend

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});
