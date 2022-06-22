import React, { useState } from 'react';
import { useEffect } from 'react';
import { IUser } from '../../../helpers/interfaces';
import { useAuth } from '../../../hooks/useAuth';
import { UserRow } from './UserRow/UserRow';
import styles from './UsersList.module.scss';

export const UsersList: React.FC = () => {
  const { baseUrl, token } = useAuth();
  const [users, setUsers] = useState<IUser[] | null>(null);

  const getAllUsers = async () => {
    try {
      const res = await fetch(`${baseUrl}/user/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data: IUser[] = await res.json();
      console.log(data);
      setUsers(data);
    } catch {}
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className={styles['users-list']}>
      <div className={`${styles['user-row']} ${styles['title']}`}>
        <div className={styles['user-cell']}>Username</div>
        <div className={styles['user-cell']}>First name</div>
        <div className={styles['user-cell']}>Last name</div>
        <div className={styles['user-cell']}>Email</div>
        <div className={styles['user-cell']}>Adress</div>
        <div className={styles['user-cell']}>Role</div>
      </div>
      {users &&
        users.map((user) => {
          return (
            <UserRow
              username={user.username}
              firstName={user.firstName}
              lastName={user.lastName}
              email={user.email}
              adress={user.address}
              role={user.roles.find((role) => role.role === 'ROLE_ADMIN') ? 'ADMIN' : 'USER'}
              key={user.id}
            />
          );
        })}
    </div>
  );
};
