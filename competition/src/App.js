import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import NotAuthenticatedRoutes from './NotAuthenticatedRoutes';

function App() {

    return <NotAuthenticatedRoutes />;
  

/*   return (
    <ThemeProvider theme={theme}>
      <Container fluid className="nopad">
        <Layout />
      </Container>
    </ThemeProvider>
  ); */
}

export default App;
