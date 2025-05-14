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


const PORT = 7018;

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES

app.get('/bikes', async (req, res) => {
    try {
        // Create and execute our queries
        const query = 'SELECT bikeID AS "Bike ID", color AS Color, style AS Style, brand AS Brand, status AS Status, dateReceived AS "Date Received" FROM Bikes;';
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
        const query = 'SELECT contactID AS "Contact ID", firstName AS "First Name", lastName AS "Last Name", phone AS Phone, email AS Email FROM Contacts;';
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
        const query = 'SELECT Customers.customerID AS "Customer ID", Customers.contactID AS "Contact ID", \
                       Contacts.firstName AS "First Name", Contacts.lastName AS "Last Name", \
                       CASE WHEN Customers.receiveNewsletter = 1 THEN "Yes" ELSE "No" \
                       END AS "Receive Newsletter?" FROM Customers \
                       INNER JOIN Contacts ON Contacts.contactID = Customers.contactID;';
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
        const query1 = 'SELECT RepairReports.repairID AS "Repair ID", RepairReports.personnelID, \
                        Contacts.firstName AS "First Name", \
                        Contacts.lastName AS "Last Name", RepairReports.dateRepaired AS "Repair Date", \
                        RepairReports.hoursSpent AS "Hours", RepairReports.bikeID AS "Bike Repaired", \
                        RepairReports.description AS "Description" FROM RepairReports \
                        INNER JOIN StorePersonnel ON StorePersonnel.personnelID = RepairReports.personnelID \
                        INNER JOIN Contacts ON Contacts.contactID = StorePersonnel.contactID;';
        
        const query2 = 'SELECT StorePersonnel.personnelID, StorePersonnel.role, Contacts.firstName, Contacts.lastName \
                        FROM StorePersonnel \
                        INNER JOIN Contacts ON StorePersonnel.contactID = Contacts.contactID \
                        ORDER BY Contacts.contactID;';
        
        // Bikes for new repair reports (only In Repair or In Review)
        const query3 = 'SELECT Bikes.bikeID, Bikes.color, Bikes.style, Bikes.dateReceived FROM Bikes \
                        WHERE Bikes.status = "In Repair" OR Bikes.status = "In Review" \
                        ORDER BY Bikes.bikeID;';
        
        // All bikes for editing existing repair reports
        const query4 = 'SELECT Bikes.bikeID, Bikes.color, Bikes.style, Bikes.status, Bikes.dateReceived FROM Bikes \
                        ORDER BY Bikes.bikeID;';
        
        const [repairreports] = await db.query(query1);
        const [storepersonnel] = await db.query(query2);
        const [bikes] = await db.query(query3);
        const [allBikes] = await db.query(query4);
        
        res.status(200).json({ 
            repairreports, 
            storepersonnel, 
            bikes,       // Bikes for new repair reports
            allBikes     // All bikes for editing
        });

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.get('/salesreports', async (req, res) => {
    try {
        // Create and execute our queries
        const query = 'SELECT SalesReports.salesID AS "Sales ID", SalesReports.bikeID AS "Bike ID", \
        SalesReports.dateSold AS "Date Sold", SalesReports.price AS "price", \
        SalesReports.customerID AS "Customer ID", Contacts.firstName AS "First Name", \
        Contacts.lastName AS "Last Name" FROM SalesReports \
        INNER JOIN Customers ON Customers.customerID = SalesReports.customerID \
        INNER JOIN Contacts ON Contacts.contactID = Customers.contactID;'
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
        const query = 'SELECT StorePersonnel.personnelID AS "Personnel ID", \
        StorePersonnel.role AS "Role", StorePersonnel.contactID AS "Contact ID", \
        Contacts.firstName AS "First Name", Contacts.lastName AS "Last Name" FROM StorePersonnel \
        INNER JOIN Contacts ON Contacts.contactID = StorePersonnel.contactID;';
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
