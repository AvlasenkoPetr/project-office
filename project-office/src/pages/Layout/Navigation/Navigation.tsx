import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { LogoutButton } from './LogoutButton/LogoutButton';
import { NavButton } from './NavButton/NavButton';
import styles from './Navigation.module.scss';

export const Navigation: React.FC = () => {
  const { isAdmin } = useAuth();

  return (
    <aside className={styles.container}>
      <NavButton link="/" image="profile">
        Profile
      </NavButton>
      <NavButton link="/office" image="office">
        Office
      </NavButton>
      {isAdmin && (
        <NavButton link="/users" image="users">
          Users
        </NavButton>
      )}
      <LogoutButton />
    </aside>
  );
};
