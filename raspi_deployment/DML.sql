/* Grant Wu and Jessica Ramirez*/
/* CS 340 - Intro. to Databases */
/* The Oaklaura Bike Co-op */

-- -----------------------------------------------------
-- Create Operations
-- -----------------------------------------------------
-- add a new RepairReport (repairID will be auto-generated)
INSERT INTO RepairReports (personnelID, bikeID, dateRepaired, hoursSpent, description)
VALUES (
  (
    SELECT personnelID FROM StorePersonnel 
    JOIN Contacts ON StorePersonnel.contactID = Contacts.contactID
    WHERE CONCAT(Contacts.firstName, ' ', Contacts.lastName) = :fullName
  ),
  (
    SELECT bikeID FROM Bikes 
    WHERE CONCAT(Bikes.color, ' ', Bikes.style, ' (Received: ', Bikes.dateReceived, ')') = :bikeDescription
  ), 
  :dateRepaired,
  :hoursSpent,
  :descriptionInput
);

-- add a new Contact (contactID will be auto-generated); hardcoded insert version
INSERT INTO Contacts (firstName, lastName, phone, email)
VALUES (:firstNameInput, :lastNameInput, :phoneInput, :emailInput);

-- -----------------------------------------------------
-- Read Operations
-- -----------------------------------------------------
-- get all attributes and records in Bikes entity
SELECT bikeID AS "Bike ID", color AS Color, style AS Style, brand AS Brand, status AS Status, dateReceived AS "Date Received" FROM Bikes;

-- get all attributes and records in Contacts entity
SELECT contactID AS "Contact ID", firstName AS "First Name", lastName AS "Last Name", phone AS Phone, email AS Email FROM Contacts;

-- get all attributes and records in Customers entity
SELECT Customers.customerID AS "Customer ID", Customers.contactID AS "Contact ID", 
  Contacts.firstName AS "First Name", Contacts.lastName AS "Last Name",
  CASE 
    WHEN Customers.receiveNewsletter = 1 THEN "Yes" 
    ELSE "No"
  END AS "Receive Newsletter?" 
FROM Customers
INNER JOIN Contacts ON Contacts.contactID = Customers.contactID;

-- get all attributes and records in RepairReports entity
SELECT RepairReports.repairID AS "Repair ID", Contacts.firstName AS "First Name",
  Contacts.lastName AS "Last Name", RepairReports.dateRepaired AS "Repair Date",
  RepairReports.hoursSpent AS "Hours", RepairReports.bikeID AS "Bike Repaired",
  RepairReports.description AS "Description"
FROM RepairReports
INNER JOIN StorePersonnel ON StorePersonnel.personnelID = RepairReports.personnelID
INNER JOIN Contacts ON Contacts.contactID = StorePersonnel.contactID;

-- get all attributes and records in SalesReports entity
SELECT SalesReports.salesID AS "Sales ID", SalesReports.bikeID AS "Bike ID", 
  SalesReports.dateSold AS "Date Sold", SalesReports.price AS "price",
  SalesReports.customerID AS "Customer ID", Contacts.firstName AS "First Name",
  Contacts.lastName AS "Last Name"
FROM SalesReports
INNER JOIN Customers ON Customers.customerID = SalesReports.customerID
INNER JOIN Contacts ON Contacts.contactID = Customers.contactID;

-- get all attributes and records in StorePersonnel entity
SELECT StorePersonnel.personnelID AS "Personnel ID",
  StorePersonnel.role AS "Role", StorePersonnel.contactID AS "Contact ID",
  Contacts.firstName AS "First Name", Contacts.lastName AS "Last Name" 
FROM StorePersonnel
INNER JOIN Contacts ON Contacts.contactID = StorePersonnel.contactID;

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

-- get all Bike IDs, style, color and dates to populate the SelectABike dropdown in RepairReports Create
SELECT Bikes.bikeID, Bikes.color, Bikes.style, Bikes.dateReceived 
FROM Bikes
ORDER BY Bikes.bikeID;

-- -----------------------------------------------------
-- Update Operations
-- -----------------------------------------------------


-- Update contact info based on submission of the update contact form
UPDATE Contacts SET
    firstName = :firstNameInput,
    lastName = :lastNameInput,
    phone = :phoneInput,
    email = :emailInput
WHERE contactID = :contactID_from_update_form;

-- Update repair report info based on submission of the update repair report form
UPDATE RepairReports SET
    dateRepaired = :dateRepairedInput,
    hoursSpent = :hoursSpentInput,
    description = :descriptionInput
WHERE repairID = :repairID_from_update_form;


-- -----------------------------------------------------
-- Delete Operations
-- -----------------------------------------------------

-- delete a contact
DELETE FROM Contacts WHERE contactID = :contact_ID_selected_from_browse_contacts_page

-- delete a Repair Report
DELETE FROM RepairReports WHERE repairID = :repair_ID_selected_from_browse_repairs_page