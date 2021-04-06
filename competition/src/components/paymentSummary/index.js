import React from "react";
import PropTypes from "prop-types";
import CompetitionPaymentSummary from "./CompetitionPaymentSummary";
import MembershipPaymentSummary from "./MembershipPaymentSummary";

import { Container } from "react-bootstrap";

function PaymentSummary({ type, checkoutData }) {
  const PaymentInfo = () => {
    switch (type) {
      case "membership":
        return <MembershipPaymentSummary checkoutData={checkoutData} />;
      case "competition":
      case "openCompetition":
        return <CompetitionPaymentSummary checkoutData={checkoutData} />;
      default:
        return <div />;
    }
  };

  return (
    <Container className="payment-summary ">
      <PaymentInfo />
    </Container>
  );
}

PaymentSummary.propTypes = {
  type: PropTypes.string,
  checkoutData: PropTypes.object,
};

export default React.memo(PaymentSummary);
