/* Grant Wu and Jessica Ramirez*/
/* CS 340 - Intro. to Databases */
/* The Oaklaura Bike Co-op */

/* Creation of Tables */

SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;
DROP TABLE IF EXISTS Bikes;
DROP TABLE IF EXISTS Contacts;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS RepairReports;
DROP TABLE IF EXISTS SalesReports;
DROP TABLE IF EXISTS StorePersonnel;

-- -----------------------------------------------------
-- Table Bikes
-- -----------------------------------------------------
CREATE TABLE Bikes (
  bikeID INT NOT NULL AUTO_INCREMENT,
  color ENUM('Black', 'White', 'Red', 'Blue', 'Green', 'Pink', 'Purple', 'Yellow', 'Orange', 'Silver', 'Other') NOT NULL,
  style ENUM('Mountain', 'Road', 'Fat', 'Hybrid', 'Enduro', 'BMX', 'Cruiser', 'Kids', 'Electric') NOT NULL,
  brand VARCHAR(45) NOT NULL,
  status ENUM('In Repair', 'In Review', 'For Sale', 'Sold') NOT NULL,
  dateReceived DATE NOT NULL,
  PRIMARY KEY (`bikeID`));

-- -----------------------------------------------------
-- Table Contacts
-- -----------------------------------------------------
CREATE TABLE Contacts (
  contactID INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(45) NOT NULL,
  lastName VARCHAR(45) NOT NULL,
  phone VARCHAR(45) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (contactID)
);

-- -----------------------------------------------------
-- Table StorePersonnel
-- -----------------------------------------------------
CREATE TABLE StorePersonnel (
  personnelID INT NOT NULL AUTO_INCREMENT,
  role ENUM('Employee', 'Volunteer') NOT NULL,
  contactID INT NOT NULL,
  PRIMARY KEY (personnelID),
  FOREIGN KEY (contactID) REFERENCES Contacts (contactID)
  ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table Customers
-- -----------------------------------------------------
CREATE TABLE Customers (
  customerID INT NOT NULL AUTO_INCREMENT,
  contactID INT NOT NULL,
  receiveNewsletter TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (customerID),
  FOREIGN KEY (contactID) REFERENCES Contacts (contactID)
  ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table RepairReports
-- -----------------------------------------------------
CREATE TABLE RepairReports (
  repairID INT NOT NULL AUTO_INCREMENT,
  personnelID INT NOT NULL,
  dateRepaired DATE NOT NULL,
  hoursSpent DECIMAL(4,2) NOT NULL,
  description VARCHAR(255) NOT NULL,
  bikeID INT,
  PRIMARY KEY (repairID),
  FOREIGN KEY (bikeID) REFERENCES Bikes(bikeID),
  FOREIGN KEY (personnelID) REFERENCES StorePersonnel(personnelID)
  ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table SalesReports
-- -----------------------------------------------------
CREATE TABLE SalesReports (
  salesID INT NOT NULL AUTO_INCREMENT,
  bikeID INT NOT NULL UNIQUE,
  dateSold DATE NOT NULL,
  price DECIMAL(5,2) NOT NULL,
  customerID INT NOT NULL,
  PRIMARY KEY (salesID),
  FOREIGN KEY (customerID) REFERENCES Customers (customerID)
  ON DELETE CASCADE,
  FOREIGN KEY (bikeID) REFERENCES Bikes (bikeID)
);

/* Insertion of Sample Data into Project */

-- Bikes Entity --

INSERT INTO Bikes 
(
    color,
    style,
    brand,
    status,
    dateReceived
)
VALUES 
(
    'Pink', 
    'Mountain', 
    'Santa Cruz', 
    'Sold', 
    '2024-08-15'
),
(
    'Red', 
    'Road', 
    'Cannondale', 
    'For Sale', 
    '2024-12-20'
),
(
    'Black', 
    'Electric', 
    'Aventon', 
    'In Review', 
    '2025-02-03'
),
(
    'Green', 
    'Cruiser', 
    'Trek', 
    'Sold', 
    '2025-02-10'
),
(   
    'Red', 
    'Enduro', 
    'Crew', 
    'Sold', 
    '2025-02-15'
),
(
    'Other',
    'Kids',
    'Trek',
    'In Repair',
    '2025-02-28'
),
(
    'White', 
    'Hybrid', 
    'Specialized', 
    'Sold', 
    '2025-03-01'
),
(
    'Black', 
    'Mountain', 
    'Felt', 
    'In Repair', 
    '2025-03-22'
);

-- Contacts Entity --

INSERT INTO Contacts 
(
    contactID, 
    firstName, 
    lastName, 
    phone, 
    email
) 
VALUES 
(
    1, 
    'Klaus', 
    'Von Hellman', 
    '305-278-2483', 
    'klausv@oaklaura-bikes.com'
),
(
    2, 
    'Hilary', 
    'Smith', 
    '462-384-2333', 
    'hilarys@oaklaura-bikes.com'
),
(
    3, 
    'Jennifer', 
    'Valdez', 
    '305-989-3455', 
    'jenval@hotmail.com'
),
(
    4, 
    'Joe', 
    'Wright', 
    '303-258-2333', 
    'justjoe@gmail.com'
),
(
    5, 
    'Damian', 
    'Malloy', 
    '416-222-8888', 
    'dammal@hotmail.com'
),
(
    6, 
    'Tabitha', 
    'Chen', 
    '233-377-8883', 
    'tchen@gmail.com'
),
(
    7, 
    'Tom', 
    'Truss', 
    '495-333-2345', 
    'tom@aol.com'
),
(
    8, 
    'Adea', 
    'Remmington', 
    '303-646-9288', 
    'adea@biscuits.com'
),
(  
    9, 
    'Joe', 
    'Johnson', 
    '453-197-4228', 
    'j.johnson@yahoo.com'
);

-- StorePersonnel Entity --

INSERT INTO StorePersonnel 
(
    contactID,
    role
)
VALUES
(
    1,
    'Employee'
),
(
    2,
    'Employee'
),
(
    4,
    'Volunteer'
),
(
    5, 
    'Volunteer'
),
(
    6,
    'Volunteer'
);

-- Customers Entity --

INSERT INTO Customers 
(
    contactID,
    receiveNewsletter
)
VALUES
(
    3, 
    0
),
(
    4,
    1
),
(
    7,
    1
),
(
    8,
    0
);

-- RepairReports Entity --

INSERT INTO RepairReports 
(
    personnelID,
    bikeID,
    dateRepaired,
    hoursSpent,
    description
)
VALUES
(
    3,
    1,
    '2024-08-30',
    3,
    'flushed brakes, replaced chain and cleaned'
),
(
    1,
    1,
    '2024-09-02',
    0.5,
    'Employee review, bike approved for sale'
),
(
    5, 
    NULL, 
    '2024-10-01', 
    5, 
    'patched damaged inner tubes (q=12)'
),
(
    2, 
    2, 
    '2025-01-03', 
    3, 
    'Replaced pedals and performed employee review: approved for sale'
),
(
    1, 
    4, 
    '2025-02-15', 
    0.5, 
    'Bike received in good condition, cleaned and reviewed: approved for sale'
),
(
    3, 
    3, 
    '2025-02-15', 
    2, 
    'retuned derailluer and cleaned, ready for review'
),
(
    1, 
    5, 
    '2025-02-16', 
    0.25, 
    'Bike received new: approved for sale'
),
(
    2, 
    7, 
    '2025-03-01', 
    0.25, 
    'bike arrived new, approved for sale'
);

-- SalesReports Entity --

INSERT INTO SalesReports 
(
    bikeID,
    customerID,
    dateSold,
    price
)
VALUES
(
    5, 
    1, 
    '2025-02-22', 
    459
),
(
    4, 
    1, 
    '2025-02-22', 
    999.97
),
(
    1, 
    2, 
    '2025-03-02', 
    3299.99
),
(
    7, 
    4, 
    '2025-03-15', 
    649
);


SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
