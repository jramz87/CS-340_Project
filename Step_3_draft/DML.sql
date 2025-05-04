/* Grant Wu and Jessica Ramirez*/
/* CS 340 - Intro. to Databases */
/* The Oaklaura Bike Co-op */

-- -----------------------------------------------------
-- Create Operations
-- -----------------------------------------------------
-- add a new RepairReport (repairID will be auto-generated)
INSERT INTO RepairReports (personnelID, bikeID, dateRepaired, hoursSpent, description) 
VALUES (:personnelID_from_storepersonnel_dropdown, :bikeID_from_bikes_dropdown, :dateRepaired, :hoursSpent, :descriptionInput);

-- add a new Bike (bikeID will be auto-generated)
INSERT INTO Bikes (color, style, brand, status, dateReceived) 
VALUES (:colorInput, :styleInput, :brandInput, :statusInput, :dateReceivedInput);

-- add a new Contact (contactID will be auto-generated)
INSERT INTO Contacts (firstName, lastName, phone, email) 
VALUES (:firstNameInput, :lastNameInput, :phoneInput, :emailInput);

-- add a new StorePersonnel (personnelID will be auto-generated)
INSERT INTO StorePersonnel (role, contactID) 
VALUES (:roleInput, :contactID_from_contacts_dropdown);

-- add a new Customer (customerID will be auto-generated)
INSERT INTO Customers (contactID, receiveNewsletter) 
VALUES (:contactID_from_contacts_dropdown, :receiveNewsletterInput);

-- add a new SalesReport (salesID will be auto-generated)
INSERT INTO SalesReports (bikeID, dateSold, price, customerID) 
VALUES (:bikeID_from_bikes_dropdown, :dateSoldInput, :priceInput, :customerID_from_customers_dropdown);

-- -----------------------------------------------------
-- Read Operations
-- -----------------------------------------------------
-- get all attributes and records in Bikes entity
SELECT * FROM Bikes;

-- get all attributes and records in Contacts entity
SELECT * FROM Contacts;

-- get all attributes and records in Customers entity
SELECT * FROM Customers;

-- get all attributes and records in RepairReports entity
SELECT * FROM RepairReports;

-- get all attributes and records in SalesReports entity
SELECT * FROM SalesReports;

-- get all attributes and records in StorePersonnel entity
SELECT * FROM StorePersonnel;

-- get all StorePersonnel IDs and Names to populate the SelectAPerson dropdown in RepairReports Update
SELECT StorePersonnel.personnelID, StorePersonnel.role, Contacts.firstName, Contacts.lastName
FROM StorePersonnel
    INNER JOIN Contacts ON StorePersonnel.contactID = Contacts.contactID
ORDER BY Contacts.contactID;

-- get all Repair IDs, Names and dates to populate the SelectAReport dropdown in RepairReports Update
SELECT RepairReports.repairID, RepairReports.dateRepaired, Contacts.firstName, Contacts.lastName
FROM RepairReports
    INNER JOIN StorePersonnel ON StorePersonnel.personnelID = RepairReports.personnelID
    INNER JOIN Contacts ON Contacts.contactID = StorePersonnel.contactID
ORDER BY RepairReports.repairID;

-- get all Bike IDs, style, color and dates to populate the SelectABike dropdown in RepairReports Update
SELECT Bikes.bikeID, Bikes.color, Bikes.style, Bikes.dateReceived 
FROM Bikes
WHERE Bikes.status = 'In Repair' OR Bikes.status = 'In Review'
ORDER BY Bikes.bikeID;

-- -----------------------------------------------------
-- Update Operations
-- -----------------------------------------------------

-- Update Bike data based on submission of the update Bike form
UPDATE Bikes SET
    color = :colorInput,
    style = :styleInput,
    brand = :brandInput,
    status = :statusInput,
    dateReceived = :dateReceivedInput
WHERE bikeID = :bikeID_from_update_form;

-- Update contact info based on submission of the update contact form
UPDATE Contacts SET
    firstName = :firstNameInput,
    lastName = :lastNameInput,
    phone = :phoneInput,
    email = :emailInput
WHERE contactID = :contactID_from_update_form;

-- Update customer info based on submission of the update customer form
UPDATE Customers SET
    receiveNewsletter = :receiveNewsletterInput
WHERE customerID = :customerID_from_update_form;


-- -----------------------------------------------------
-- Delete Operations
-- -----------------------------------------------------

-- delete a contact
DELETE FROM Contacts WHERE contactID = :contact_ID_selected_from_browse_contacts_page

-- delete a Customer
DELETE FROM Customer WHERE customerID = :customer_ID_selected_from_browse_customers_page

-- delete a StorePersonnel
DELETE FROM StorePersonnel WHERE personnelID = :personnel_ID_selected_from_browse_personnel_page