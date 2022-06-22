import React, { useState } from 'react';
import { Header } from '../../components/Header/Header';
import { UsersList } from './UsersList/UsersList';
import styles from './UsersPage.module.scss';

export const UsersPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <UsersList></UsersList>
    </div>
  );
};
