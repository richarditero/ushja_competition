import React from 'react';
import {Image, Row, Col, Container} from 'react-bootstrap';
import {
  FaMapMarker,
  FaFacebookSquare,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaVimeoV
} from 'react-icons/fa';
import {HiMail} from 'react-icons/hi';
import './Footer.css';
import FooterLogo from '../../../assets/images/footer-logo.png';

const FooterContainer = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col className="logo-col p-25 footerresp">
            <div>
              <Image src={FooterLogo} />
            </div>
          </Col>
          <Col xs={7} className="content-col p-25 footerresp">
            <div className="footer-row1">
              <h3 className="address">
                <FaMapMarker />
                3870 Cigar Lane, Lexington, KY 40511
              </h3>
            </div>
            <nav className="footer-row2">
              <ul className="footer-info">
                <li>
                  <p>
                    <FaPhone />
                    (859) 225-6700
                  </p>
                </li>
                <li>
                  <p>
                    <HiMail />
                    membership@ushja.org
                  </p>
                </li>
                <li>
                  <p>USHJA Privacy Policy</p>
                </li>
                <li>
                  <p>Terms and Conditions</p>
                </li>
              </ul>
            </nav>
          </Col>
          <Col className="social-icon p-25 footerresp">
            <div>
              <ul className="list">
                <li className="li-child ui-li-first-child">
                  <FaFacebookSquare size={'1.3rem'} />
                </li>
                <li className="li-child">
                  <FaTwitter size={'1.3rem'} />
                </li>
                <li className="li-child">
                  <FaVimeoV size={'1.3rem'} />
                </li>
                <li className="li-child">
                  <FaInstagram size={'1.3rem'} />
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FooterContainer;
