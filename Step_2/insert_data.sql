/* Jessica Ramirez and Grant Wu */
/* CS 340 - Intro. to Databases */
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
    'Other', 
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