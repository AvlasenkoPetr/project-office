import React from 'react';
import { useState } from 'react';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { SignUpForm } from '../../components/SignUpForm/SignUpForm';
import styles from './LoginPage.module.scss';

export const LoginPage: React.FC = () => {
  const [isSigingUp, setForm] = useState<boolean>(false);
  const changeForm = () => {
    setForm(!isSigingUp);
  };

  return (
    <div className={styles.container}>
      {isSigingUp ? <SignUpForm changeForm={changeForm} /> : <LoginForm changeForm={changeForm} />}
    </div>
  );
};
