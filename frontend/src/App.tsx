import React from 'react';
// BrowserRouter will encapsulate our Route components
// but please notice the BrowserRouter will match the path
// value using a 'contains' in the URL
// use the 'exact' keyword to have it match the route exactly
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/global';
import Routes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => (
  <>
    <AppProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AppProvider>
    <GlobalStyles />
  </>
);

export default App;
