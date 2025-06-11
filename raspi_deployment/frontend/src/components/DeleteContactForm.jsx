// Citation for the code below (5/14/2025):
// The code here was based on the the starter code provided in Module 8, Exploration "Implementing CUD operations in your app" from:
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

import { useState, useEffect } from 'react';
import { VscTrash } from "react-icons/vsc";
import DeleteContactConfirmation from './DeleteContactConfirmation';

const DeleteContactForm = ({ rowObject, backendURL, refreshContacts }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [popupPosition, setPopupPosition] = useState(null);
    const fullname = rowObject["First Name"] + ' ' + rowObject["Last Name"];

    const handleDeleteClick = (e) => {
        e.preventDefault();
        
        // Get position for popup
        const rect = e.target.getBoundingClientRect();
        setPopupPosition({
            top: rect.bottom + window.scrollY + 10,
            left: rect.left + window.scrollX - 150
        });
        
        setShowConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        const formData = {
            delete_contact_id: rowObject["Contact ID"],
            delete_contact_name: fullname,
        };

        try {
            const response = await fetch(`${backendURL}/contacts/delete`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Contact deleted successfully.");
                refreshContacts();
                setShowConfirmation(false);
            } else {
                console.error("Failed to delete contact.");
            }
        } catch (error) {
            console.error('Error during delete operation:', error);
        }
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
        setPopupPosition(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showConfirmation && !event.target.closest('.delete-confirmation-popup')) {
                handleCancelDelete();
            }
        };

        if (showConfirmation) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showConfirmation]);

    return (
        <>
            <VscTrash className="delete-button" onClick={handleDeleteClick}/>
            
            {showConfirmation && (
                <DeleteContactConfirmation 
                    contact={rowObject}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    position={popupPosition}
                />
            )}
        </>
    );
};

export default DeleteContactForm;