import React from 'react';
import Button from 'react-bootstrap/Button';

const DeleteContactConfirmation = ({ contact, onConfirm, onCancel, position }) => {
  const fullname = contact ? contact["First Name"] + ' ' + contact["Last Name"] : '';

  const popupStyle = position ? {
    top: position.top,
    left: position.left
  } : {};

  return (
    <div 
      className={`delete-confirmation-popup ${!position ? 'centered' : ''}`}
      style={popupStyle}
    >
      <div className="bubble-arrow-top-left"></div>
      
      <button 
        className="close-tooltip" 
        onClick={onCancel}
        aria-label="Close confirmation"
      >
        ×
      </button>
      
      <div className="tooltip-content">
        <h5 className="confirmation-header">
          Confirm Deletion
        </h5>
        
        <p className="confirmation-message">
          Are you sure you want to delete this contact and all their related records?
        </p>
        
        {contact && (
          <div className="contact-preview">
            <div className="contact-name">{fullname}</div>
            {contact["Email"] && <div className="contact-email">{contact["Email"]}</div>}
          </div>
        )}
        
        <div className="confirmation-buttons">
          <Button 
            variant="secondary" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            className="btn-delete"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteContactConfirmation;