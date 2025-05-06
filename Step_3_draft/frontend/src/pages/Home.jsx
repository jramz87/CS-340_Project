// Citation for the code below (4/30/2025):
// The code here was adapted from the the starter code provided in Module 6, Exploration "Web Application Technology" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948
import '../App.css';

function Home() {
    return (
        <>
            <div className="homepage">
                <h1>Group Project #1: The Oaklaura Bike Co-Op</h1>
                <h3>Grant Wu and Jessica Ramirez</h3>
            </div>
            <div className="projectDescription">
                <h4>Overview of Project:</h4>
                <p>The Oaklaura Bike Cooperative is a non-profit organization that accepts donations of old or broken bicycles, refurbishes them, and then sells them at an affordable price. The co-op sees 50-100 bicycles enter and exit their doors on a monthly basis. Due to limited funding, the co-op operates with a small team of 10 employees and relies heavily on volunteers to assist with bicycle repairs. At the current time there are about 100 volunteers that donate their time, and this is expected to grow over the course of the next five years. The co-op’s limited funding also requires they use a basic POS system that can only process one bike sale at a time, setting a limit of one bike per sales order. The co-op brings in on average between $10,000 and $25,000 per month, and most of this revenue is used to support the small team of dedicated employees as well as to provide community engagement events.</p>
                <p>Store personnel consist of both volunteers and employees. Most volunteers are not experienced bike mechanics, so they often can't fully repair a bike during the few hours the co-op is open for volunteer work. To maintain continuity and organization, volunteers are expected to repair what they can during their shift and document their progress in a report. This allows the next volunteer and/or employee to review the logs and continue the work where the previous one left off. Sometimes volunteers engage in non-bike specific work, such as cleaning and fixing stock parts such as cassettes, wheels and derailleurs, which gets documented in these repair reports as well. Once a volunteer believes a bike is fully repaired, a trained employee inspects it to ensure it meets safety standards before placing it on the sales floor. Once there, a bike can be sold, a transaction which is tracked through a sales report.</p>
                <p>Historically, the co-op tracked repair progress and sales using handwritten notecards stored in a filing cabinet. However, as the organization grows, this system has become increasingly difficult to manage. Implementing a database would be an ideal solution for organizing and sharing information between volunteers and employees about the status of each bicycle, as well as for tracking the inventory and sales history of the ever expanding co-op.</p>
            </div>
            <div className="webpageDescription">
                <h4>Overview of Webapp:</h4>
                <ul>
                    <li><strong>Frontend:</strong> React with Bootstrap</li>
                    <li><strong>Backend:</strong> Node.js with Express</li>
                    <li><strong>Database:</strong> MySQL and phpMyAdmin</li>
                    <li><strong>Deployment:</strong> Hosted on OSU College of Engineering servers using PM2 process manager</li>
                </ul>
                <p>The following functionality has been implemented:</p>
                <ul>
                    <li>Read operations on every entity</li>
                    <li>Create operations on Contacts and RepairReport entities (in progress)</li>
                    <li>Update operations on Contacts and RepairReport entities (in progress)</li>
                    <li>Delete operations on Contacts and RepairReport entities (in progress)</li>
                </ul>
            </div>
        </>
    )
} export default Home;