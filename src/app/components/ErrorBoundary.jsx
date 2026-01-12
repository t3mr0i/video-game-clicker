'use client';

import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled error:', error);
    toast.error('An unexpected error occurred. Please refresh the page.', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback game-card text-center p-8">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-300 mb-4">
            We apologize for the inconvenience. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="game-button bg-red-600 hover:bg-red-700"
          >
            Reload Page
          </button>
          <ToastContainer />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;