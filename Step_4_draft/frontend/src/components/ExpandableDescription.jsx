// Citation for the code below (5/11/2025):
// The code here was based on GenAI: claude.ai
// Prompt: "Write me a React component that can be used as an expandable cell in a table"

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import '../App.css';

function ExpandableDescription({ text, maxLength = 20 }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  
  // Check if text needs to be truncated
  const needsTruncation = text && text.length > maxLength;
  const displayText = needsTruncation ? `${text.substring(0, maxLength)}...` : text;
  
  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (isPopupVisible && buttonRef.current && !buttonRef.current.contains(event.target)) {
        // Check if the click was not on the tooltip itself
        const tooltip = document.querySelector('.description-tooltip');
        if (tooltip && !tooltip.contains(event.target)) {
          setIsPopupVisible(false);
        }
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupVisible]);
  
  const handleMoreClick = (e) => {
    e.stopPropagation();
    
    // Calculate position based on button location
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      // Position to lower left of the button
      setPopupPosition({
        top: window.scrollY + rect.bottom + 5, // 5px below the button
        left: Math.max(rect.left - 270, 10) // Position to the left, but ensure it's not off-screen
      });
    }
    
    setIsPopupVisible(!isPopupVisible);
  };
  
  return (
    <>
      <span className="description-text">
        {displayText}
      </span>
      
      {needsTruncation && (
        <button 
          ref={buttonRef}
          className="more-button" 
          onClick={handleMoreClick}
        >
          More
        </button>
      )}
      
      {isPopupVisible && createPortal(
        <div 
          className="description-tooltip"
          style={{
            position: 'absolute',
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
            transform: 'none' 
          }}
        >
          <div className="tooltip-content">
            {text}
          </div>
          <button 
            className="close-tooltip"
            onClick={() => setIsPopupVisible(false)}
          >
            ×
          </button>
          <div className="bubble-arrow bubble-arrow-top-right"></div>
        </div>,
        document.body
      )}
    </>
  );
}

export default ExpandableDescription;