//Citation for the code below (4/30/2025):
// The code here was based on the the starter code provided in Module 6, Exploration "Web Application Technology" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

const DeletePersonForm = ({ rowObject, backendURL, refreshPeople }) => {

    return (
        <td>
            <form>
                <button type='submit'>
                    Delete
                </button>
            </form>
        </td>

    );
};

export default DeletePersonForm;