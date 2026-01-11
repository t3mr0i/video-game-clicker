import React, { useState } from 'react';

const Tooltip = ({ children, content, position = 'top', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  if (!content) return children;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg whitespace-nowrap ${positionClasses[position]} ${className}`}>
          {content}
          <div className={`absolute w-0 h-0 border-4 border-transparent ${
            position === 'top' ? 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-900' :
            position === 'bottom' ? 'bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-900' :
            position === 'left' ? 'left-full top-1/2 transform -translate-y-1/2 border-l-gray-900' :
            'right-full top-1/2 transform -translate-y-1/2 border-r-gray-900'
          }`} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;