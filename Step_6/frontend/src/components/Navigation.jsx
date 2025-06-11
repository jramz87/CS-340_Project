// Citation for the code below (4/30/2025):
// The code here was based on the the starter code provided in Module 6, Exploration "Web Application Technology" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

// Citation for the code below (5/4/2025):
// The code used for the Navbar was based on a freely available React Bootstrap component:
// https://react-bootstrap.netlify.app/docs/components/navs

import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link, useLocation } from 'react-router-dom';
import bikeIcon from '../assets/bike-3-256.png';
import ResetDatabaseConfirmation from '../components/ResetDatabaseConfirmation';
import '../App.css';

function Navigation({ backendURL }) {
    const activepage = useLocation();
    const currentPath = activepage.pathname;
    const [showResetConfirmation, setShowResetConfirmation] = useState(false);
    const [popupPosition, setPopupPosition] = useState(null);

    const handleResetClick = (e) => {
        e.preventDefault();
        
        // Get position for popup - position above the button
        const rect = e.target.getBoundingClientRect();
        setPopupPosition({
            top: rect.top + window.scrollY - 10,
            left: rect.left + window.scrollX - 150
        });
        
        setShowResetConfirmation(true);
    };

    const handleConfirmReset = async () => {
        try {
            const response = await fetch(`${backendURL}/reset-db`, {
                method: 'POST',
            });

            if (response.ok) {
                alert('Database reset successfully!');
                window.location.reload();
            } else {
                alert('Reset failed.');
            }
        } catch (err) {
            console.error('Error resetting database:', err);
            alert('Error connecting to the backend.');
        }
        
        setShowResetConfirmation(false);
    };

    const handleCancelReset = () => {
        setShowResetConfirmation(false);
        setPopupPosition(null);
    };

    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showResetConfirmation && !event.target.closest('.delete-confirmation-popup')) {
                handleCancelReset();
            }
        };

        if (showResetConfirmation) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showResetConfirmation]);

    return (
        <div className="navigation-wrapper">
            <div className="logo-banner bg-navy text-white text-center py-3 mb-0 d-flex align-items-center justify-content-center">
                <img 
                    src={bikeIcon} 
                    alt="Bike icon" 
                    className="nav-icon"
                    width="80"
                    height="50"
                />
                <h2 className="m-0">    Oaklaura Bike Co-Op    </h2>
                <img 
                    src={bikeIcon} 
                    alt="Bike icon" 
                    className="nav-icon"
                    width="80"
                    height="50"
                />
            </div>

            <div className="nav-container bg-navy">
                <Nav className="nav-centered bg-navy" variant="tabs" activeKey={currentPath}>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/" active={currentPath === "/"}>Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/bikes" active={currentPath === "/bikes"}>Bikes</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/contacts" active={currentPath === "/contacts"}>Contacts</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/customers" active={currentPath === "/customers"}>Customers</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/repairreports" active={currentPath === "/repairreports"}>Repair Reports</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/salesreports" active={currentPath === "/salesreports"}>Sales Reports</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/storepersonnel" active={currentPath === "/storepersonnel"}>Store Personnel</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>

            <div className="text-center my-3">
                <Button variant="warning" onClick={handleResetClick}>Reset Database</Button>
            </div>

            {showResetConfirmation && (
                <ResetDatabaseConfirmation 
                    onConfirm={handleConfirmReset}
                    onCancel={handleCancelReset}
                    position={popupPosition}
                />
            )}
        </div>
    );
}

export default Navigation;