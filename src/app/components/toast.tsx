import React, { createContext, useState, useContext, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ToastMessageProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

interface ToastContextType {
  showToast: (toast: ToastMessageProps) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastMessage: React.FC<ToastMessageProps> = ({ type, message, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4h4a1 1 0 001-1.414l-2-2a1 1 0 011.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 1.414Z"/>
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 11-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 10 7.707l2.293 2.293a1 1 0 011.414 1.414L13.414 10l-2.293-2.293a1 1 0 011.414-1.414L10 8.586l-2.293 2.293a1 1 0 01-1.414 1.414L6.293 10 10 13.414l2.293-2.293a1 1 0 011.414 1.414L13.414 10l2.293 2.293Z"/>
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm1-4a1 1 0 11-2 0v6a1 1 0 112 0V6a1 1 0 01-2 0v5Z"/>
          </svg>
        );
      case 'info':
        return (
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v6a6 6 0 006 6h.01a6 6 0 006-6V8a6 6 0 00-6-6H10zm0 14a4 4 0 110-8 4 4 0 010 8z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-500';
      case 'error':
        return 'bg-red-100 text-red-500';
      case 'warning':
        return 'bg-orange-100 text-orange-500';
      case 'info':
        return 'bg-blue-100 text-blue-500';
      default:
        return '';
    }
  };

  return (
    <div 
      className={`fixed top-4 right-4 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 ${getBackgroundColor()} z-50 animate-slide-in`} 
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8">
        {getIcon()}
        <span className="sr-only">{type} icon</span>
      </div>
      <div className="ms-3 text-sm font-normal">
        {message}
      </div>
      {onClose && (
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          aria-label="Close"
          onClick={onClose}
        >
          <span className="sr-only">Close</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessageProps[]>([]);

  const showToast = (toast: ToastMessageProps) => {
    const id = Date.now();
    const newToast = { ...toast, id };
    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Automatically remove toast after 5 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t: any) => t.id !== id));
    }, 5000);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => (toast as any).id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <ToastMessage 
              key={(toast as any).id}
              type={toast.type}
              message={toast.message}
              onClose={() => removeToast((toast as any).id)}
            />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

// Custom hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastMessage;