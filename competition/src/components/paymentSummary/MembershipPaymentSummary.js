import React, {useState, useEffect} from 'react';
import {ApiUtil} from '../../util/ApiUtil';
import {Spinner} from 'react-bootstrap';

function MembershipPaymentSummary(props) {
  const [membershipPlanDeatils, setMembershipPlanDeatils] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    ApiUtil.postWithToken('member/paymentSummary', {
      membershipPlanId: props?.checkoutData?.membershipPlanId
    })
      .then(res => {
        setLoading(false);
        setMembershipPlanDeatils(res?.data);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="bold-text checkout-wrapper">
          Membership Type -{' '}
          {`${membershipPlanDeatils?.name} - ${membershipPlanDeatils?.price}$`}
        </div>
      )}
    </div>
  );
}

export default MembershipPaymentSummary;
