import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({
  size = 'medium',
  color = 'blue',
  message = 'Loading...',
  overlay = false,
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    red: 'border-red-500',
    yellow: 'border-yellow-500',
    purple: 'border-purple-500',
    white: 'border-white'
  };

  const spinner = (
    <div className={`
      ${sizeClasses[size]}
      border-2
      ${colorClasses[color]}
      border-t-transparent
      rounded-full
      animate-spin
    `}></div>
  );

  if (overlay) {
    return (
      <div className={`
        absolute inset-0
        bg-gray-900 bg-opacity-75
        flex flex-col items-center justify-center
        z-50
        rounded-lg
        ${className}
      `}>
        {spinner}
        {message && (
          <div className="mt-3 text-white text-sm font-medium animate-pulse">
            {message}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {spinner}
      {message && (
        <div className="mt-2 text-gray-300 text-sm font-medium animate-pulse">
          {message}
        </div>
      )}
    </div>
  );
};

Loading.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xl']),
  color: PropTypes.oneOf(['blue', 'green', 'red', 'yellow', 'purple', 'white']),
  message: PropTypes.string,
  overlay: PropTypes.bool,
  className: PropTypes.string
};

export default Loading;