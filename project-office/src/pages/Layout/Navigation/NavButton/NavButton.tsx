import React, { ButtonHTMLAttributes } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavButton.module.scss';

type IProps = {
  link: string;
  image: string;
};

export const NavButton: React.FC<IProps> = ({ link, image, children }) => {
  const basicClassname = `${styles.container} ${styles[image]}`;
  const setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${basicClassname} ${styles.active}` : `${basicClassname}`;

  return (
    <NavLink to={link} className={setActive}>
      {children}
    </NavLink>
  );
};
