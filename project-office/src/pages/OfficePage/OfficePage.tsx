import React from 'react';
import { Header } from '../../components/Header/Header';
import { Scheme } from '../../components/Scheme/Scheme';
import './OfficePage.css';

export const OfficePage: React.FC = () => {
  return (
    <div className="main-content">
      <Scheme />
    </div>
  );
};
