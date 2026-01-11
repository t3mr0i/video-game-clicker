import React from 'react';

const Card = ({
  title,
  children,
  className = '',
  headerActions,
  variant = 'default'
}) => {
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    dark: 'bg-gray-800 border border-gray-700 text-white',
    success: 'bg-green-50 border border-green-200',
    warning: 'bg-yellow-50 border border-yellow-200',
    error: 'bg-red-50 border border-red-200'
  };

  return (
    <div className={`rounded-lg shadow-md ${variantClasses[variant]} ${className}`}>
      {title && (
        <div className="flex justify-between items-center p-4 border-b border-inherit">
          <h3 className="text-lg font-semibold">{title}</h3>
          {headerActions && <div>{headerActions}</div>}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default Card;