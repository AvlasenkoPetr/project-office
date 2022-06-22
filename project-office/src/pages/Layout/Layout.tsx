import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import styles from './Layout.module.scss';
import { Navigation } from './Navigation/Navigation';

export const Layout: React.FC = ({ children }) => {
  return (
    <main className={styles.container}>
      <div className={styles.container__wrapper}>
        <Navigation />
        <div className={styles.container__content}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </main>
  );
};
