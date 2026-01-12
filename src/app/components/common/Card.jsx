import React from 'react';

const Card = ({
  title,
  children,
  className = '',
  headerActions,
  variant = 'default',
  onHover = false,
  onClick,
  focusable = false,
  ariaLabel
}) => {
  const variantClasses = {
    default: 'bg-white border border-slate-200 text-slate-900',
    light: 'bg-slate-50 border border-slate-200 text-slate-900',
    success: 'bg-green-50 border border-green-200 text-green-900',
    warning: 'bg-amber-50 border border-amber-200 text-amber-900',
    error: 'bg-red-50 border border-red-200 text-red-900',
    info: 'bg-blue-50 border border-blue-200 text-blue-900'
  };

  const handleKeyPress = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <div
      className={`
        rounded-xl
        shadow-sm
        transition-all
        duration-200
        ${variantClasses[variant]}
        ${className}
        ${onHover ? 'hover:-translate-y-1 hover:shadow-md cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${focusable || onClick ? 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' : ''}
      `}
      onClick={onClick}
      onKeyDown={handleKeyPress}
      tabIndex={focusable || onClick ? 0 : -1}
      role={onClick ? 'button' : 'region'}
      aria-label={ariaLabel || title}
    >
      {title && (
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;