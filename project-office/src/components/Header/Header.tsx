import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Header.css';

export const Header: React.FC = () => {
  const { isAdmin } = useAuth();

  return (
    <header className="header">
      <NavLink to="/">Office</NavLink>
      <NavLink to="/edit">Edit profile</NavLink>
      <NavLink to="/layout">Test layout</NavLink>
      {isAdmin && <NavLink to="/users">Users</NavLink>}
    </header>
  );
};
