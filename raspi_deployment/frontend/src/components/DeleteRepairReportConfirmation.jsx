import React from 'react';
import Button from 'react-bootstrap/Button';

const DeleteRepairReportConfirmation = ({ repairReport, onConfirm, onCancel, position }) => {
  const repairId = repairReport ? repairReport["Repair ID"] : '';
  
  // Get reporter name from the joined contact data
  const reportedBy = repairReport ? (
    repairReport["First Name"] && repairReport["Last Name"] ? 
      `${repairReport["First Name"]} ${repairReport["Last Name"]}` : 'Unknown Reporter'
  ) : '';

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
          Are you sure you want to delete this repair report?
        </p>
        
        {repairReport && (
          <div className="contact-preview">
            <div className="contact-name">Repair ID: {repairId}</div>
            <div className="contact-email">Reported By: {reportedBy}</div>
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

export default DeleteRepairReportConfirmation;