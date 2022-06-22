import React, { ReactNode } from 'react';
import './FormChangeButton.css';

interface IProps {
  changeForm: () => void;
  children: ReactNode;
}

export const FormChangeButton: React.FC<IProps> = ({ changeForm, children }) => {
  return (
    <button className="form-change-button" onClick={changeForm}>
      {children}
    </button>
  );
};
