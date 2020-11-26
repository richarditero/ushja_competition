import React, {useEffect, useRef} from 'react';
import Navbar from './navbar';
import BrandContainer from './brand';
import {useDispatch} from 'react-redux';

function Header() {
  const headerRef = useRef(null);
  const dispatch = useDispatch();



  return (
    <div ref={headerRef}>
      <BrandContainer />
      <Navbar />
    </div>
  );
}

export default Header;
