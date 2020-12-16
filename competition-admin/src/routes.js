import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';

import {
  Account,
  Login,
  Competition,
} from './views';

const routes = (isLoggedIn) => [
  {
    path: '/app',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: '/account', element: <Account /> },
      { path: '/open-competition', element: <Competition /> },
      { path: '/', element: <Navigate to="/app/open-competition" /> },
      { path: '*', element: <Navigate to="/app/open-competition" /> },

    ],
  },
  {
    path: '/',
    element: !isLoggedIn ? <MainLayout /> : <Navigate to="/app/open-competition" />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/login" /> },
    ],
  },
];

export default routes;
