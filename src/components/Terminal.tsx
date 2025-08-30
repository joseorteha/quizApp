import React, { useState, useRef, useEffect } from 'react';

interface TerminalProps {
  children: React.ReactNode;
  title?: string;
}

const Terminal: React.FC<TerminalProps> = ({ children, title = 'Quiz Terminal' }) => {
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when content changes
    if (terminalBodyRef.current) {
      const scrollToBottom = () => {
        terminalBodyRef.current!.scrollTop = terminalBodyRef.current!.scrollHeight;
      };
      
      // Small delay to ensure content is rendered
      const timeoutId = setTimeout(scrollToBottom, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [children]);

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-controls">
          <div className="terminal-control terminal-control-close" />
          <div className="terminal-control terminal-control-minimize" />
          <div className="terminal-control terminal-control-maximize" />
        </div>
        <div className="terminal-title">{title}</div>
        <div style={{ width: '60px' }} /> {/* Spacer for balance */}
      </div>
      <div 
        className="terminal-body" 
        ref={terminalBodyRef}
        style={{ 
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch' // Better scroll on iOS
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const TerminalLine: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="terminal-line">
      {children}
    </div>
  );
};

export const TerminalPrompt: React.FC<{ text?: string }> = ({ text = '>' }) => {
  return (
    <span className="terminal-prompt">{text}</span>
  );
};

export const TerminalOutput: React.FC<{ 
  children: React.ReactNode;
  type?: 'default' | 'success' | 'error' | 'info' | 'warning';
}> = ({ children, type = 'default' }) => {
  const className = type !== 'default' ? `terminal-output terminal-output-${type}` : 'terminal-output';
  
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export const TerminalInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
}> = ({ value, onChange, onSubmit, placeholder = 'Type your answer...', disabled = false }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !disabled) {
      onSubmit();
    }
  };

  return (
    <div className="terminal-input-line">
      <TerminalPrompt />
      <input
        type="text"
        className="terminal-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus
      />
      {!value && <span className="terminal-cursor" />}
    </div>
  );
};

export default Terminal;