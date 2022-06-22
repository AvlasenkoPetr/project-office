import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { EditForm } from './EditForm/EditForm';
import styles from './ProfilePage.module.scss';

export const ProfilePage: React.FC = () => {
  const { signOut } = useAuth();

  return <EditForm />;
};
