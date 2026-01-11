import React from 'react';

const Card = ({
  title,
  children,
  className = '',
  headerActions,
  variant = 'default',
  onHover = false,
  onClick
}) => {
  const variantClasses = {
    default: 'bg-gray-800 border-2 border-gray-700 text-white',
    dark: 'bg-gray-900 border-2 border-blue-900 text-white',
    success: 'bg-green-800 border-2 border-green-700 text-white',
    warning: 'bg-yellow-800 border-2 border-yellow-700 text-white',
    error: 'bg-red-800 border-2 border-red-700 text-white'
  };

  return (
    <div
      className={`
        rounded-lg
        shadow-xl
        transform
        transition-all
        duration-300
        ${variantClasses[variant]}
        ${className}
        ${onHover ? 'hover:scale-105 hover:shadow-2xl cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
    >
      {title && (
        <div className="flex justify-between items-center p-4 border-b border-inherit bg-gray-700/50">
          <h3 className="text-lg font-bold text-blue-300">{title}</h3>
          {headerActions && <div>{headerActions}</div>}
        </div>
      )}
      <div className="p-4 space-y-2">
        {children}
      </div>
    </div>
  );
};

export default Card;