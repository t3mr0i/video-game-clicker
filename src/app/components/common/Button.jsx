import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

// Utility function for class merging
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Import unified Button component
// For compatibility, we'll create a wrapper that maps the old API to the new one
const Button = forwardRef(({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  className = '',
  loading = false,
  leftIcon,
  rightIcon,
  ...props
}, ref) => {
  // Map old variants to new design system variants
  const variantMap = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    success: 'bg-success-600 hover:bg-success-700 text-white focus:ring-success-500',
    danger: 'bg-error-600 hover:bg-error-700 text-white focus:ring-error-500',
    warning: 'bg-warning-600 hover:bg-warning-700 text-white focus:ring-warning-500',
    outline: 'bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-50 hover:border-primary-700 hover:text-primary-700 focus:ring-primary-500'
  };

  // Map old sizes to new design system sizes
  const sizeMap = {
    small: 'h-8 px-3 text-xs',
    medium: 'h-10 px-4 py-2 text-sm',
    large: 'h-12 px-6 text-base'
  };

  const baseClasses = [
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-md',
    'transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none',
    'shadow-sm hover:shadow-md',
  ];

  const variantClasses = variantMap[variant] || variantMap.primary;
  const sizeClasses = sizeMap[size] || sizeMap.medium;

  return (
    <button
      ref={ref}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        baseClasses,
        variantClasses,
        sizeClasses,
        className
      )}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && leftIcon && (
        <span className="flex-shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!loading && rightIcon && (
        <span className="flex-shrink-0">{rightIcon}</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  loading: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
};

export default Button;