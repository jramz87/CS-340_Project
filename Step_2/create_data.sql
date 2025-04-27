-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cs340_wugr
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cs340_wugr
-- -----------------------------------------------------
-- CREATE SCHEMA IF NOT EXISTS `cs340_wugr` DEFAULT CHARACTER SET utf8 ;
USE `cs340_wugr` ;

-- -----------------------------------------------------
-- Table `cs340_wugr`.`Bikes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_wugr`.`Bikes` (
  `bikeID` INT NOT NULL AUTO_INCREMENT,
  `color` ENUM('Black', 'White', 'Red', 'Blue', 'Green', 'Pink', 'Purple', 'Yellow', 'Orange', 'Silver', 'Other') NOT NULL,
  `style` ENUM('Mountain', 'Road', 'Fat', 'Hybrid', 'Enduro', 'BMX', 'Cruiser', 'Kids', 'Electric') NOT NULL,
  `brand` VARCHAR(45) NOT NULL,
  `status` ENUM('In Repair', 'In Review', 'For Sale', 'Sold') NOT NULL,
  `dateReceived` DATE NOT NULL,
  PRIMARY KEY (`bikeID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_wugr`.`Contacts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_wugr`.`Contacts` (
  `contactID` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`contactID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_wugr`.`StorePersonnel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_wugr`.`StorePersonnel` (
  `personnelID` INT NOT NULL AUTO_INCREMENT,
  `role` ENUM('Employee', 'Volunteer') NOT NULL,
  `contactID` INT NOT NULL,
  PRIMARY KEY (`personnelID`),
  INDEX `contactID_idx` (`contactID` ASC) VISIBLE,
  CONSTRAINT `contactID`
    FOREIGN KEY (`contactID`)
    REFERENCES `cs340_wugr`.`Contacts` (`contactID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_wugr`.`customers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_wugr`.`customers` (
  `custID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`custID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_wugr`.`Customers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_wugr`.`Customers` (
  `customerID` INT NOT NULL AUTO_INCREMENT,
  `contactID` INT NOT NULL,
  `receiveNewsletter` TINYINT(1) NOT NULL,
  PRIMARY KEY (`customerID`),
  INDEX `contactID_idx` (`contactID` ASC) VISIBLE,
  CONSTRAINT `contactID`
    FOREIGN KEY (`contactID`)
    REFERENCES `cs340_wugr`.`Contacts` (`contactID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_wugr`.`RepairReports`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_wugr`.`RepairReports` (
  `repairID` INT NOT NULL AUTO_INCREMENT,
  `personnelID` INT NOT NULL,
  `dateRepaired` DATE NOT NULL,
  `hoursSpent` DECIMAL(4,2) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `bikes_bikeID` INT NULL,
  PRIMARY KEY (`repairID`),
  INDEX `fk_repair_reports_bikes1_idx` (`bikes_bikeID` ASC) VISIBLE,
  INDEX `fk_storePersonnel_personnellID_idx` (`personnelID` ASC) VISIBLE,
  CONSTRAINT `fk_repair_reports_bikes1`
    FOREIGN KEY (`bikes_bikeID`)
    REFERENCES `cs340_wugr`.`Bikes` (`bikeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_storePersonnel_personnellID`
    FOREIGN KEY (`personnelID`)
    REFERENCES `cs340_wugr`.`StorePersonnel` (`personnelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_wugr`.`SalesReports`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_wugr`.`SalesReports` (
  `salesID` INT NOT NULL AUTO_INCREMENT,
  `bikes_bikeID` INT NOT NULL,
  `dateSold` DATE NOT NULL,
  `price` DECIMAL(5,2) NOT NULL,
  `customers_customerID` INT NOT NULL,
  PRIMARY KEY (`salesID`),
  INDEX `bikeID_idx` (`bikes_bikeID` ASC) VISIBLE,
  INDEX `fk_customers_customerID_idx` (`customers_customerID` ASC) VISIBLE,
  UNIQUE INDEX `bikes_bikeID_UNIQUE` (`bikes_bikeID` ASC) VISIBLE,
  CONSTRAINT `fk_customers_customerID`
    FOREIGN KEY (`customers_customerID`)
    REFERENCES `cs340_wugr`.`Customers` (`customerID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_report_bike1`
    FOREIGN KEY (`bikes_bikeID`)
    REFERENCES `cs340_wugr`.`Bikes` (`bikeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_wugr`.`bikes_has_employees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_wugr`.`bikes_has_employees` (
  `bikes_bikeID` INT NOT NULL,
  `employees_employeeID` INT NOT NULL,
  PRIMARY KEY (`bikes_bikeID`, `employees_employeeID`),
  INDEX `fk_bikes_has_employees_employees1_idx` (`employees_employeeID` ASC) VISIBLE,
  INDEX `fk_bikes_has_employees_bikes1_idx` (`bikes_bikeID` ASC) VISIBLE,
  CONSTRAINT `fk_bikes_has_employees_bikes1`
    FOREIGN KEY (`bikes_bikeID`)
    REFERENCES `cs340_wugr`.`Bikes` (`bikeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bikes_has_employees_employees1`
    FOREIGN KEY (`employees_employeeID`)
    REFERENCES `cs340_wugr`.`StorePersonnel` (`personnelID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
