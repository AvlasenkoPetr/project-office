import React from 'react';
import styles from '../UsersList.module.scss';

interface IProps {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  adress: string;
  role: string;
}

export const UserRow: React.FC<IProps> = ({
  username,
  firstName,
  lastName,
  email,
  adress,
  role,
}) => {
  return (
    <div className={styles['user-row']}>
      <div className={styles['user-cell']}>{username}</div>
      <div className={styles['user-cell']}>{firstName}</div>
      <div className={styles['user-cell']}>{lastName}</div>
      <div className={styles['user-cell']}>{email}</div>
      <div className={styles['user-cell']}>{adress}</div>
      <div className={styles['user-cell']}>{role}</div>
    </div>
  );
};
