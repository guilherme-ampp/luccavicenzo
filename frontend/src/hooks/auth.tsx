/* eslint-disable react/prop-types */
import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface SignInCredentials {
  phonenumber: string;
}
interface AuthContextData {
  token: string;
  phonenumber: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  token: string;
  phonenumber: string;
}

/** For an authentication context - it makes little sense to give it an
 * initial value.
 * To init with an empty object and still trick TypeScript into accepting it.
 * We do {} as AuthContext - we cast an empty object as AuthContext */
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(
    (): AuthState => {
      const token = localStorage.getItem('@LuccaVicenzo:token');
      const phonenumber = localStorage.getItem('@LuccaVicenzo:number');
      if (token && phonenumber) {
        return { token, phonenumber };
      }
      return {} as AuthState;
    },
  );

  const signIn = useCallback(async ({ phonenumber }: SignInCredentials) => {
    const response = await api.post('/sessions', { phonenumber });

    const { token, number } = response.data;
    localStorage.setItem('@LuccaVicenzo:token', token);
    localStorage.setItem('@LuccaVicenzo:number', number);

    setData({ token, phonenumber: number });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@LuccaVicenzo:token');
    localStorage.removeItem('@LuccaVicenzo:number');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token: data.token,
        phonenumber: data.phonenumber,
        signOut,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used withint an AuthProvider');
  }

  return context;
}
