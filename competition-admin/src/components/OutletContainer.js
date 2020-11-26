import React from 'react';
import { Outlet } from 'react-router-dom';

function OutletContainer() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default OutletContainer;
