// Citation for the code below (4/30/2025):
// The code here was adapted from the starter code provided in Module 6, Exploration "Web Application Technology" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948 -->

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { backendURL } from './config';

// Pages
import Home from './pages/Home';
import Bikes from './pages/Bikes';
import Contacts from './pages/Contacts';
import Customers from './pages/Customers';
import RepairReports from './pages/RepairReports';
import SalesReports from './pages/SalesReports';
import StorePersonnel from './pages/StorePersonnel';

// Components
import Navigation from './components/Navigation';

function App() {

    return (
        <>
            <Navigation backendURL={backendURL}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bikes" element={<Bikes backendURL={backendURL} />} />
                <Route path="/contacts" element={<Contacts backendURL={backendURL} />} />
                <Route path="/customers" element={<Customers backendURL={backendURL} />} />
                <Route path="/repairreports" element={<RepairReports backendURL={backendURL} />} />
                <Route path="/salesreports" element={<SalesReports backendURL={backendURL} />} />
                <Route path="/storepersonnel" element={<StorePersonnel backendURL={backendURL} />} />
            </Routes>
        </>
    );

} export default App;
