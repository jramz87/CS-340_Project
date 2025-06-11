import React from 'react';
import Button from 'react-bootstrap/Button';
import { VscWarning } from "react-icons/vsc";

const ResetDatabaseConfirmation = ({ onConfirm, onCancel, position }) => {
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
          Confirm Database Reset
        </h5>
        
        <p className="confirmation-message">
          Are you sure you want to reset the entire database?
        </p>
        
        <div className="contact-preview">
          <div className="warning-header">
            <VscWarning size={20} />
            WARNING
            <VscWarning size={20} />
          </div>
          <div className="contact-email">This action cannot be undone!</div>
        </div>
        
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
            Reset Database
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetDatabaseConfirmation;