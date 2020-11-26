import React from 'react';
import { useRoutes, HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import theme from './theme';
import GlobalStyles from './components/styles/GlobalStyles';
import SnackBar from './components/Snackbar';
import Loader from './components/Loader';

import './App.css';
import routes from './routes';

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const routing = useRoutes(routes(isLoggedIn));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
      <Loader />
      <SnackBar />
    </ThemeProvider>
  );
}

export default App;
