//Citation for the code below (5/1/2025):
// The code here was based on the the starter code provided in Module 6, Exploration "Web Application Technology" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

const CreateRepairReport = ({ storepersonnel, bikes, backendURL, refreshRepairReports }) => {

    // Clean up date formatting
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <>
        <h2>Create a Repair Report</h2>

        <form className='cuForm'>
            <label htmlFor="create_rreport_personnel">Person Making Report: </label>
            <select
                name="create_rreport_personnel"
                id="create_rreport_personnel"
            >
                <option value="">Select a Person</option>
                {storepersonnel.map((storepersonnel, index) => (
                    <option value={storepersonnel.personnelID} key={index}>{storepersonnel.firstName} {storepersonnel.lastName} ({storepersonnel.role})</option>
                ))}
            </select>

            <label htmlFor="create_rreport_date">Date: </label>
            <input
                type="date"
                name="create_rreport_date"
                id="create_rreport_date"
            />

            <label htmlFor="create_rreport_hours">Time Required: </label>
            <input
                type="number"
                name="create_rreport_hours"
                id="create_rreport_hours"
            />

            <label htmlFor="create_rreport_bikes">Choose a Bike: </label>
            <select
                name="create_rreport_bikes"
                id="create_rreport_bikes"
            >
                <option value="">Select a Bike</option>
                {bikes.map((bikes, index) => (
                    <option value={bikes.bikeID} key={index}>{bikes.color}, {bikes.style} (Received: {formatDate(bikes.dateReceived)})</option>
                ))}
            </select>

            <input type="submit" />
        </form>
        </>
    );
};

export default CreateRepairReport;