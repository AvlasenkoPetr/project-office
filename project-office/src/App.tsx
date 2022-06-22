import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './hoc/AuthProvider';
import { RequireAuth } from './hoc/RequireAuth';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { Layout } from './pages/Layout/Layout';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { OfficePage } from './pages/OfficePage/OfficePage';
import { UsersPage } from './pages/UsersPage/UsersPage';
import './styles/App.scss';

export const App: React.FC = () => {
  return (
    <div className="app">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {/* <Route
            path="/"
            element={
              <RequireAuth>
                <Layout>
                  <ProfilePage />
                </Layout>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/office"
            element={
              <RequireAuth>
                <Layout>
                  <OfficePage />
                </Layout>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/users"
            element={
              <RequireAuth>
                <Layout>
                  <UsersPage />
                </Layout>
              </RequireAuth>
            }
          ></Route> */}
          <Route path="/" element={<Layout />}>
            <Route index element={<ProfilePage />} />
            <Route path="office" element={<OfficePage />} />
            <Route path="users" element={<UsersPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
};
