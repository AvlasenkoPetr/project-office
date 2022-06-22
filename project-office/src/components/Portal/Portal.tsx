import React, { ReactNode } from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

export const Portal: React.FC = ({ children }) => {
  useEffect(() => {
    document.body.appendChild(el);

    return () => {
      document.body.removeChild(el);
    };
  }, []);

  const el = document.createElement('div');
  return ReactDOM.createPortal(children, el);
};
