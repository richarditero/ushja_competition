import React, {
  useMemo,
  useEffect,
  forwardRef,
  useState,
  useImperativeHandle,
} from "react";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { TextField, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessSnackbar } from "../../store/action/snackbarAction";
import strings from "../../i18n/Strings";
import { ApiUtil } from "../../util/ApiUtil";
import { Button, Spinner } from "react-bootstrap";
import StripeInput from "../shared/hoc/StripeInput";
import { useHistory } from "react-router-dom";

const useOptions = () => {
  const fontSize = 18;
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    [fontSize]
  );

  return options;
};

const CheckoutForm = forwardRef((props, ref) => {
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [pay, setPay] = useState(props.amount);
  const [codeErrorMsg, setCodeErrorMsg] = useState("");
  const dispatch = useDispatch();
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    address: {
      line1: "",
      postal_code: "",
    },
  });
  const [displayBillingDetailsErr, setDisplayBillingDetailsErr] = useState(
    false
  );

  useImperativeHandle(ref, () => {
    return { handlePayCheckOut: handlePayCheckOut };
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setPay(props.amount);
  }, [props.amount]);

  const handlePayCheckOut = async () => {
    console.log("calling");
    setLoading(true);
    if (!stripe || !elements) {
      console.log("not loaded");
      props.onFailure();
      setLoading(false);
      return;
    }

    if (
      !billingDetails.name ||
      !billingDetails.address.line1 ||
      !billingDetails.address.postal_code
    ) {
      console.log("inside if");
      setLoading(false);
      return setDisplayBillingDetailsErr(true);
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
        billing_details: billingDetails,
      });

      if (error) {
        setLoading(false);
        props.onFailure();
        console.log("[error]", error);
      } else {
        stripePaymentMethodHandler(paymentMethod);
      }
    } catch (err) {
      props.onFailure();
      setLoading(false);
    }
  };
  const stripePaymentMethodHandler = async (paymentMethod) => {
    // send paymentMethod.id to the server
    try {
      const paymentResponse = await ApiUtil.postData("payment/open", {
        paymentMethod,
        checkoutData: props.checkoutData,
        amount: pay,
        type: props.type,
        username: props.username,
        userEmail: props.userEmail,
      });

      setLoading(false);

      // Handle server response
      handleServerResponse(paymentResponse);
    } catch (err) {
      props.onFailure();
      console.log(err);
      setLoading(false);
    }
  };

  const handleServerResponse = async (response) => {
    const { stripe } = props;
    if (response.error) {
      // Show error from server on payment form
      history.replace({
        pathname: "/completed",
        state: {
          type: "failure",
        },
      });
    } else if (response.requires_action) {
      // Use Stripe.js to handle the required card action
      const {
        error: errorAction,
        paymentIntent,
      } = await stripe.handleCardAction(response.payment_intent_client_secret);

      if (errorAction) {
        // Show error from Stripe.js in payment form
        history.push({
          pathname: "/completed",
          state: {
            type: "failure",
          },
        });
      } else {
        // The card action has been handled
        // The PaymentIntent can be confirmed again on the server

        const serverResponse = await ApiUtil.postData("payment/open", {
          payment_intent_id: paymentIntent.id,
          checkoutData: props.checkoutData,
          amount: pay,
          type: props.type,
        });
        handleServerResponse(serverResponse);
      }
    } else {
      history.push({
        pathname: "/completed",
        state: {
          type: "success",
        },
      });
    }
  };
  const handleApply = async () => {
    if (code === "") {
      setCodeError(true);
    } else {
      setCodeError(false);
      setCodeErrorMsg("");
    }
  };
  return (
    // <form onSubmit={handleSubmit}>
    <form>
      {error && <div className="error">{error}</div>}
      {props.showCouponCode && (
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={10}>
            <TextField
              label="Coupon code"
              name="couponCode"
              placeholder="Coupon code"
              fullWidth
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
              InputLabelProps={{ shrink: true }}
              error={codeError}
              helperText={codeErrorMsg}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              className="apply"
              variant="primary"
              onClick={() => handleApply()}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      )}

      <TextField
        label="Card Holder Name"
        name="name"
        required
        fullWidth
        style={{ marginTop: 15, marginBottom: 15 }}
        InputLabelProps={{ shrink: true }}
        value={billingDetails.name}
        error={displayBillingDetailsErr && !billingDetails.name}
        onChange={(e) => {
          setBillingDetails({ ...billingDetails, name: e.target.value });
        }}
      />

      <TextField
        label="Address"
        name="line1"
        required
        fullWidth
        style={{ marginTop: 15, marginBottom: 15 }}
        InputLabelProps={{ shrink: true }}
        error={displayBillingDetailsErr && !billingDetails.address.line1}
        onChange={(e) => {
          setBillingDetails({
            ...billingDetails,
            address: {
              ...billingDetails.address,
              line1: e.target.value,
            },
          });
        }}
      />

      <TextField
        label="Postal Code"
        name="postal_code"
        error={displayBillingDetailsErr && !billingDetails.address.postal_code}
        required
        fullWidth
        style={{ marginTop: 15, marginBottom: 15 }}
        InputLabelProps={{ shrink: true }}
        onChange={(e) => {
          setBillingDetails({
            ...billingDetails,
            address: {
              ...billingDetails.address,
              postal_code: e.target.value,
            },
          });
        }}
      />

      <TextField
        label="Credit Card Number"
        name="ccnumber"
        // variant="outlined"
        required
        fullWidth
        style={{ marginTop: 15, marginBottom: 15 }}
        InputProps={{
          inputComponent: StripeInput,
          inputProps: {
            component: CardNumberElement,
            options: { ...options, showIcon: true },
          },
        }}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Expiration date"
        name="ccexpdate"
        // variant="outlined"
        required
        fullWidth
        style={{ marginTop: 15, marginBottom: 15 }}
        InputProps={{
          inputComponent: StripeInput,
          inputProps: {
            component: CardExpiryElement,
            options: { ...options },
          },
        }}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="CVC"
        name="cccvc"
        // variant="outlined"
        required
        fullWidth
        style={{ marginTop: 15, marginBottom: 15 }}
        InputProps={{
          inputComponent: StripeInput,
          inputProps: {
            component: CardCvcElement,
            options: { ...options },
          },
        }}
        InputLabelProps={{ shrink: true }}
      />

      <Button
        className="pay-button"
        variant="primary"
        onClick={(e) => handlePayCheckOut()}
        disabled={loading || !stripe}
      >
        {loading && (
          <Spinner
            animation="border"
            variant="light"
            size="sm"
            style={{ marginRight: 10 }}
          />
        )}
        Pay - ${pay}
      </Button>
    </form>
  );
});

export default CheckoutForm;

CheckoutForm.propTypes = {
  stripe: PropTypes.any,
  elements: PropTypes.node,
  amount: PropTypes.number,
  checkoutData: PropTypes.object,
  type: PropTypes.string,
  showCouponCode: PropTypes.bool,
  onSuccess: PropTypes.function,
  onFailure: PropTypes.function,
};

CheckoutForm.defaultProps = {
  amount: 0,
  type: "",
  checkoutData: {},
  showCouponCode: false,
  onSuccess: () => {},
  onFailure: () => {},
};
