import React from 'react';
import {Container, Row, Image, Button} from 'react-bootstrap';
import './Brand.css';
import {
  FaSearch,
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
  FaPlayCircle
} from 'react-icons/fa';
import {CgLogIn} from 'react-icons/cg';

import AppLogo from '../../../../assets/images/hex_logo.png';

function BrandContainer() {
  return (
    <Container fluid className={'brand-container padrl15'}>
      <Row className="d-flex justify-content-between align-items-center row-container respheader">
        <div className="h-100 app-logo-container">
          <Image src={AppLogo} className="app-logo" />
        </div>

        <div className="d-flex h-100 list-container justify-content-end">
          <div className="h-40 d-flex">
            <div className="d-flex h-100 navbar-about-us">
              <div className="text-style">Our Sponsors</div>
              <div className="text-style">Contact Us</div>
              <div className="text-style">About Us</div>
            </div>

            <div className="logo-container">
              <div className="search-logo">
                <FaSearch color="#7a7a7a" />
              </div>
            </div>
            <div className="d-flex logo-container social-container">
              <div className="social-logo">
                <FaFacebookSquare color="#7a7a7a" size={'1.3rem'} />
              </div>
              <div className="social-logo">
                <FaTwitterSquare color="#7a7a7a" size={'1.3rem'} />
              </div>
              <div className="social-logo">
                <FaInstagramSquare color="#7a7a7a" size={'1.3rem'} />
              </div>
            </div>
          </div>

          <div className="button-container">
            <div>
              <Button variant="secondary" className="button">
                VIDEO LIBRARY
                <FaPlayCircle size={'1.3rem'} style={{marginLeft: 10}} />
              </Button>
              <Button variant="secondary" className="button bg-yellow">
                MEMBER ACCOUNT
                <CgLogIn size={'1.3rem'} style={{marginLeft: 10}} />
              </Button>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default BrandContainer;
