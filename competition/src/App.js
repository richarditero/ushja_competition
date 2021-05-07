import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FooterLayout from "./components/layout/footer";

import NotAuthenticatedRoutes from "./NotAuthenticatedRoutes";

const Footer = () => (
  <footer className="footer_container">
    <FooterLayout />
  </footer>
);

function App() {
  return (
    <div className="content">
      <NotAuthenticatedRoutes />
    </div>
  );
}

const AppContainer = () => {
  return [<App key="1"/>, <Footer key="2"/>];
};

export default AppContainer;
