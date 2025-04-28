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
  email VARCHAR(100) NOT NULL,
  PRIMARY KEY (contactID)
);

-- -----------------------------------------------------
-- Table StorePersonnel
-- -----------------------------------------------------
CREATE TABLE StorePersonnel (
  personnelID INT NOT NULL AUTO_INCREMENT,
  role ENUM('Employee', 'Volunteer'),
  contactID INT NOT NULL,
  PRIMARY KEY (personnelID),
  FOREIGN KEY (contactID) REFERENCES Contacts (contactID)
);

-- -----------------------------------------------------
-- Table Customers
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Customers (
  customerID INT NOT NULL AUTO_INCREMENT,
  contactID INT NOT NULL,
  receiveNewsletter TINYINT(1) NOT NULL,
  PRIMARY KEY (customerID),
  FOREIGN KEY (contactID) REFERENCES Contacts (contactID)
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
  bikes_bikeID INT NULL,
  PRIMARY KEY (repairID),
  FOREIGN KEY (bikes_bikeID) REFERENCES Bikes(bikeID),
  FOREIGN KEY (personnelID) REFERENCES StorePersonnel(personnelID)
);

-- -----------------------------------------------------
-- Table SalesReports
-- -----------------------------------------------------
CREATE TABLE SalesReports (
  salesID INT NOT NULL AUTO_INCREMENT,
  bikes_bikeID INT NOT NULL,
  dateSold DATE NOT NULL,
  price DECIMAL(5,2) NOT NULL,
  customers_customerID INT NOT NULL,
  PRIMARY KEY (salesID),
  FOREIGN KEY (customers_customerID) REFERENCES Customers (customerID),
  FOREIGN KEY (bikes_bikeID) REFERENCES Bikes (bikeID)
);
