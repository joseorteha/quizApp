import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  type?: 'dots' | 'spinner' | 'terminal';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Cargando...', 
  type = 'terminal' 
}) => {
  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return <div className="loading-dots"></div>;
      
      case 'spinner':
        return <div className="loading-spinner"></div>;
      
      case 'terminal':
      default:
        return (
          <div className="loading-terminal">
            <span className="loading-cursor">_</span>
          </div>
        );
    }
  };

  return (
    <div className="loading-container">
      {renderLoader()}
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
