// Citation for the code below (4/30/2025):
// The code here was based on the the starter code provided in Module 6, Exploration "Web Application Technology" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

// Citation for the code below (5/4/2025):
// The code used for the Navbar was based on a freely available React Bootstrap component:
// https://react-bootstrap.netlify.app/docs/components/navs
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';

function Navigation() {

    const activepage = useLocation();
    const currentPath = activepage.pathname;

    return (
        <>
        <div className="logo-banner bg-navy text-white text-center py-3 mb-0">
            <h2 className="m-0">Oaklaura Bike Co-Op</h2>
        </div>

        <Nav justify variant="tabs" activeKey={currentPath}>
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
        </>
    )
} export default Navigation;