/* Grant Wu and Jessica Ramirez*/
/* CS 340 - Intro. to Databases */
/* The Oaklaura Bike Co-op */

-- -----------------------------------------------------
-- Create Operations
-- -----------------------------------------------------
-- add a new RepairReport
INSERT INTO RepairReports (repairID, personnelID, bikeID, dateRepaired, hoursSpent, description) 
VALUES (:repairID, :personnelID_from_dropdown_Input, :bikelID_from_dropdown_Input, :dateRepaired, :hoursSpent, description);

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

-- -----------------------------------------------------
-- Delete Operations
-- -----------------------------------------------------
