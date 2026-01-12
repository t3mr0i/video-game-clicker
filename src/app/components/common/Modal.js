import React, { useEffect } from 'react';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  className = ''
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={`
        relative bg-gray-800 text-white rounded-lg shadow-2xl
        border border-gray-600 transform transition-all duration-300
        ${sizeClasses[size]} w-full mx-4 max-h-[90vh] overflow-hidden
        ${className}
      `}>
        <div className="flex justify-between items-center p-6 border-b border-gray-600 bg-gray-700/50">
          <h2 id="modal-title" className="text-xl font-bold text-blue-300">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;