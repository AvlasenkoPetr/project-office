import React from 'react';
import styles from '../NavButton/NavButton.module.scss';

export const LogoutButton: React.FC = () => {
  return <button className={`${styles.container} ${styles.logout}`}>Logout</button>;
};
