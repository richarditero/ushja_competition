import React, {useState, useRef} from 'react';
import './Checkout.css';
import CheckoutForm from './CheckoutForm';

import PropTypes from 'prop-types';
import PayButton from '../shared/hoc/PayButton';
import {useHistory} from 'react-router-dom';

function Checkout({location, componetProps}) {
  const PaymentSummary = componetProps; // payment summary component

  const paymentRef = useRef();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onPayClick = () => {
    if (!loading) {
      paymentRef.current.handlePayCheckOut();
    }
  };

  const onSuccess = () => {
    setLoading(false);
    console.log('onSuccess');
    return history.push({
      pathname: '/completed',
      state: {
        type: 'success'
      }
    });
  };

  const onFailure = () => {
    setLoading(false);
    history.push({
      pathname: '/completed',
      state: {
        type: 'failure'
      }
    });
  };

  return (
    <div className="checkout-bg">
      <PaymentSummary
        type={location.state.type}
        checkoutData={location.state.checkoutData}
      />
      <div className="checkout-root">
        <div className="checkout-wrapper">
          <div className="checkout">
            <div className="price-header"></div>
            <CheckoutForm
              ref={paymentRef}
              checkoutData={location?.state?.checkoutData}
              amount={location?.state?.amount}
              type={location?.state?.type}
              username={location.state.username}
              userEmail={location.state.email}
              onSuccess={onSuccess}
              onFailure={onFailure}
              setPayLoading={setLoading}
            />
            <div style={{textAlign: 'center'}}>
              <PayButton
                handlePayAmount={onPayClick}
                amount={location?.state?.amount}
                paymentLoader={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Checkout.propTypes = {
  location: PropTypes.object,
  componetProps: PropTypes.elementType
};

export default Checkout;
