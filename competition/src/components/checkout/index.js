import React from 'react';
import './Checkout.css';
import CheckoutForm from './CheckoutForm';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PropTypes from 'prop-types';
import {
  Box
} from '@material-ui/core';
import Footer from "../layout/footer";

const publishableKey =
  'pk_test_51Ha3YMKFC4sBdrdLZZoOL3KRCuZxXRckVRRxvtqN6ny8yK7qQd7FnQDnkFbC8NhCTw0WoFRAUqvXnFOqTBiZVUNH00mAYJ53LO';
const stripePromise = loadStripe(publishableKey);

function Checkout({location, componetProps}) {
  const PaymentSummary = componetProps; // payment summary component

  return (
    <div className="checkout-bg" style={{marginTop:20}}>
      <PaymentSummary
        type={location.state.type}
        checkoutData={location.state.checkoutData}
      />
      <div className="checkout-root">
        <div className="checkout-wrapper">
          <div className="checkout">
            <div className="price-header"></div>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                checkoutData={location?.state?.checkoutData}
                amount={location?.state?.amount}
                type={location?.state?.type}
                username={location.state.username}
                userEmail={location.state.email}
              />
            </Elements>
          </div>
        </div>
      </div>
      <Box mt={2}>
        <Footer/>
      </Box>
    </div>
  );
}

Checkout.propTypes = {
  location: PropTypes.object,
  componetProps: PropTypes.elementType
};

export default Checkout;
