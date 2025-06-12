// Citation for the code below (4/30/2025):
// The code here was based on the the starter code provided in Module 6, Exploration "Web Application Technology" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

// Citation for the code below (5/14/2025):
// The code here was based on the the starter code provided in Module 8, Exploration "Implementing CUD operations in your app" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

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

// RESET ROUTE

app.post('/reset-db', async (req, res) => {
    try {
        // Call the stored procedure that resets the database
        const query = 'CALL sp_load_bikesdb();';
        await db.query(query);

        res.status(200).json({ message: "Database successfully reset to base state." });

    } catch (error) {
        console.error("Error executing reset procedure:", error);
        res.status(500).send("An error occurred while resetting the database.");
    }
});

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
        const query1 = 'SELECT RepairReports.repairID AS "Repair ID", RepairReports.personnelID AS "Personnel ID", \
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
        SalesReports.dateSold AS "Date Sold", SalesReports.price AS "Price", \
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

// DELETE ROUTES

app.post('/contacts/delete', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;
        console.log(data);
        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteContact(?);`;
        await db.query(query1, [data.delete_contact_id]);

        console.log(`DELETE contacts. ID: ${data.delete_contact_id} ` +
            `Name: ${data.delete_contact_name}`
        );

        // Send a success status
        res.sendStatus(200);
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/repairreports/delete', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;
        console.log(data);
        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteRepair(?);`;
        await db.query(query1, [data.delete_repair_id]);

        console.log(`DELETE contacts. ID: ${data.delete_repair_id}`);

        // send a success status
        res.sendStatus(200);
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// CREATE ROUTES
app.post('/contacts', async (req, res) => {
    try {
        const { firstNameInput, lastNameInput, phoneInput, emailInput } = req.body;
        const query = 'INSERT INTO Contacts (firstName, lastName, phone, email) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [firstNameInput, lastNameInput, phoneInput, emailInput]);
        
        res.status(201).json({ 
            message: 'Contact created successfully', 
            contactId: result.insertId 
        });

    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({
            error: "An error occurred while creating the contact.",
            details: error.message
        });
    }
});

app.post('/repairreports', async (req, res) => {
    try {
        const { personnelID, bikeID, dateRepaired, hoursSpent, description } = req.body;
        const query = `
            INSERT INTO RepairReports (personnelID, bikeID, dateRepaired, hoursSpent, description)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(query, [
            personnelID,
            bikeID || null,
            dateRepaired,
            hoursSpent,
            description
        ]);

        res.status(201).json({
            message: 'Repair report created successfully',
            repairID: result.insertId
        });

    } catch (error) {
        console.error("Error creating repair report:", error);
        res.status(500).json({
            error: "An error occurred while creating the repair report.",
            details: error.message
        });
    }
});

// UPDATE ROUTES

app.post('/contacts/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query = 'CALL sp_UpdateContacts(?, ?, ?, ?, ?);';
        await db.query(query, [
            data.firstName,
            data.lastName,
            data.phone,
            data.email,
            data.contactID
        ]);

        console.log(`UPDATE Contact info for contactID: ${data.contactID}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/contacts');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

app.post('/repairreports/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query = 'CALL sp_UpdateRepairReports(?, ?, ?, ?, ?, ?);';
        await db.query(query, [
            data.personnelID,
            data.dateRepaired,
            data.hoursSpent,
            data.description,
            data.bikeID,
            data.repairID
        ]);

        console.log(`UPDATE repair info for repairID: ${data.repairID}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/repairreports');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// ########################################
// ########## LISTENER

app.listen(PORT, '0.0.0.0', function () {
    console.log('Express started on http://0.0.0.0:' + PORT + '; press Ctrl-C to terminate.')
});
