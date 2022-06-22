import React, { ReactNode, useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { IUser } from '../helpers/interfaces';

interface IRefreshTokenBody {
  refreshToken: string;
}

interface IRefreshTokenRes {
  type: string;
  accessToken: string;
  refreshToken: string;
}

interface IAuth {
  token: string | null;
  isAdmin: boolean;
  baseUrl: string;
  // isLoading: boolean;
  signIn: (token: string, isAdmin: boolean, cb?: () => void) => void;
  signOut: (cb: () => void) => void;
}

export const AuthContext = createContext<IAuth>({
  token: null,
  isAdmin: false,
  baseUrl: '',
  // isLoading: true,
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
  const baseUrl = 'https://office-project-kalinin.herokuapp.com';

  const [token, setToken] = useState<string | null>(localStorage.getItem('token') || null);
  const [isAdmin, setAdmin] = useState<boolean>(false);

  // const getNewToken = async () => {
  //   const refreshToken = localStorage.getItem('refreshToken');
  //   if (!refreshToken) {
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('refreshToken');
  //     return;
  //   }

  //   const body: IRefreshTokenBody = {
  //     refreshToken: refreshToken,
  //   };
  //   try {
  //     const res = await fetch(`${baseUrl}/api/auth/refresh`, {
  //       method: 'POST',
  //       body: JSON.stringify(body),
  //       headers: {
  //         'Content-type': 'application/json; charset=UTF-8',
  //       },
  //     });
  //     const data = await res.json();
  //     localStorage.setItem('token', data.accessToken);
  //     localStorage.setItem('refreshToken', data.refreshToken);
  //     setToken(data.accessToken);
  //   } catch {}
  // };

  const getSelfInfo = async () => {
    const res = await fetch(`${baseUrl}/user/self`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data: IUser = await res.json();
    const isAdmin = data.roles.find((role) => role.role === 'ROLE_ADMIN') ? true : false;
    setAdmin(isAdmin);
  };

  // useEffect(() => {
  //   getNewToken();
  // }, []);

  useEffect(() => {
    if (token) {
      getSelfInfo();
    }
  }, [token]);

  const signIn = (token: string, isAdmin: boolean, cb?: () => void) => {
    setToken(token);
    setAdmin(isAdmin);
    if (cb) {
      cb();
    }
  };

  const signOut = (cb: () => void) => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    cb();
  };

  const value = { token, isAdmin, baseUrl, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
