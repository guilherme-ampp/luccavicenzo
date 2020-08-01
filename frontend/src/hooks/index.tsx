/* eslint-disable react/prop-types */
import React from 'react';
import { AuthProvider } from './auth';

/** A global provider to encapsulate all providers */
const AppProvider: React.FC = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProvider;
