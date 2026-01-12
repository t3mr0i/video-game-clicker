import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  className = '',
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    outline: 'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
  };

  const sizeClasses = {
    small: 'py-1 px-2 text-sm',
    medium: 'py-2 px-4',
    large: 'py-3 px-6 text-lg'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        font-bold rounded transition-all duration-300 relative overflow-hidden
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled
          ? 'opacity-40 cursor-not-allowed saturate-50 scale-95 shadow-none bg-gray-600 text-gray-300'
          : 'transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
        }
        ${className}
      `}
      {...props}
    >
      {disabled && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin opacity-75"></div>
        </div>
      )}
      <span className={disabled ? 'opacity-60' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string
};

export default Button;