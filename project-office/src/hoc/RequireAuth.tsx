import React from 'react';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface IProps {
  children: React.ReactElement;
}

export const RequireAuth: React.FC<IProps> = ({ children }) => {
  const location = useLocation();
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" state={{ form: location }} />;
  }

  return children;
};
