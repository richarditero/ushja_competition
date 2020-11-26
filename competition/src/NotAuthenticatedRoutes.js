import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom';
import {publicRoutes as routes} from './app-routes';
import {SnackBar} from './components/shared';
import Footer from './components/layout/footer';

function NotAuthenticatedRoutes() {
  return (
    <>
      <div /* style={{height:136}} *//>
      <div /* style={{minHeight: 'calc(100vh - 265px)'}} */>
        <Router>
          <Switch>
            {routes.map(({path, Component, componetProps}) => (
              <Route
                exact
                key={path}
                path={path}
                render={props => (
                  <Component {...props} componetProps={componetProps} />
                )}></Route>
            ))}
            <Redirect to={'/competition'} />
          </Switch>
          <SnackBar />
        </Router>
      </div>
   {/*    <Footer /> */}
    </>
  );
}

export default NotAuthenticatedRoutes;
