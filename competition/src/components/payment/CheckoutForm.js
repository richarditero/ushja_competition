import React, {
  useEffect,
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
} from "react";

import CreditCardInput from "./CardElement";
import ReCAPTCHA from "react-google-recaptcha";

import {
  TextField,
  Grid,
  Button,
  Box,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { ApiUtil } from "../../util/ApiUtil";
import { useDispatch } from "react-redux";

import CloseIcon from "@material-ui/icons/Close";
import { showFailureSnackbar } from "../../store/action/snackbarAction";

const CheckoutForm = forwardRef((props, ref) => {
  const [error, setError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [pay, setPay] = useState(props.amount);
  const [codeErrorMsg, setCodeErrorMsg] = useState("");
  const [appliedCoupons, setAppliedCoupons] = useState([]);
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    address: {
      line1: "",
      postal_code: "",
    },
  });
  const [displayBillingDetailsErr, setDisplayBillingDetailsErr] = useState(
    false
  );
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isValidCard, setIsValidCard] = useState(false);
  const [cardErr, setCardErr] = useState(false);
  const cardInputref = useRef();
  const captchaRef = useRef();
  const [captchaString, setCaptchaString] = useState("");
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => {
    return { handlePayCheckOut: handlePayCheckOut };
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (props.appliedCoupons) {
      setAppliedCoupons(props.appliedCoupons);
    }
  }, [props.appliedCoupons]);

  useEffect(() => {
    setPay(props.amount);
  }, [props.amount]);

  useEffect(() => {
    if (props.type !== "cart") {
      const totalDiscount = appliedCoupons.reduce(
        (accumulator, { type, value }) =>
          type === "percentage"
            ? accumulator +
              parseFloat(
                calculatePercentageAmount(
                  parseFloat(value),
                  parseFloat(props.amount)
                ).toFixed(2)
              )
            : accumulator + parseFloat(value),
        0
      );
      const finalAmount =
        parseFloat(props.amount) - totalDiscount <= 0
          ? 1 // minimum amount
          : parseFloat(props.amount) - totalDiscount;
      setPay(finalAmount);
      props.setToPay(finalAmount);
    }
  }, [appliedCoupons]);

  const handlePayCheckOut = async () => {
    if (
      !billingDetails.firstName ||
      !billingDetails.lastName ||
      !billingDetails.address.line1 ||
      !billingDetails.address.postal_code
    ) {
      if (!cardNumber || !expiry || !cvc) {
        cardInputref.current.addErrClass();
        setCardErr(true);
      }
      return setDisplayBillingDetailsErr(true);
    }

    if (!cardNumber || !expiry || !cvc) {
      return setCardErr(true);
    }

    setCardErr(false);

    if (!isValidCard) {
      return;
    }

    if (!captchaString) {
      return dispatch(showFailureSnackbar("Verify the captcha"));
    }

    const c_d = { billingDetails, cardNumber, expiry, cvc };
    props.setPayLoading(true);
    checkout(c_d);
  };

  const checkout = async (c_d) => {
    try {
      const paymentResponse = await ApiUtil.postWithoutToken("payment/open", {
        c_d,
        checkoutData: props.checkoutData,
        amount: pay,
        type: props.type,
        username: props.username,
        userEmail: props.userEmail,
        captchaString,
      });
      console.log(paymentResponse);
      props.onSuccess(paymentResponse);
    } catch (err) {
      console.log(err);
      props.onFailure(err);
    }
  };

  const handleApply = async () => {
    const checkIsCouponAlreadyApplied = appliedCoupons.filter(
      (val) => val.promoCode === code
    );
    if (code === "" || checkIsCouponAlreadyApplied.length !== 0) {
      setCodeError(true);
    } else {
      setCodeError(false);
      setCodeErrorMsg("");
      getDiscountCoupon();
    }
  };

  const calculatePercentageAmount = (originalPrice, discountInPercent) => {
    return parseFloat((originalPrice * discountInPercent) / 100);
  };

  const getDiscountCoupon = () => {
    setCouponLoading(true);
    ApiUtil.postWithoutToken("discount/apply", { code })
      .then((res) => {
        setCouponLoading(false);
        validateCoupon(res.data);
        setCodeError(false);
      })
      .catch(() => {
        setCouponLoading(false);
        setCodeErrorMsg("Invalid Coupon");
        setCodeError(true);
      });
  };

  const validateCoupon = (data) => {
    const checkIsCouponAlreadyApplied = appliedCoupons.filter(
      (val) => val.discountId === data.discountId
    );

    if (
      data.category.includes(props.type) &&
      checkIsCouponAlreadyApplied.length === 0
    ) {
      setCode("");
      setAppliedCoupons((prevState) => [...prevState, data]);
    } else {
      setCodeErrorMsg("Coupon not applicable");
    }
  };

  const handleCloseCoupon = (index) => {
    setAppliedCoupons((prevState) => prevState.filter((val, i) => i !== index));
  };

  return (
    <form>
      {error && <div className="error">{error}</div>}
      {props.showCouponCode && (
        <>
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
                FormHelperTextProps={{
                  style: {
                    color: "#EC5269",
                  },
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                className="apply"
                variant="primary"
                disabled={couponLoading}
                onClick={() => handleApply()}
              >
                Apply
                {couponLoading && (
                  <CircularProgress
                    size="1rem"
                    style={{ marginLeft: 5, color: "white" }}
                  />
                )}
              </Button>
            </Grid>
          </Grid>

          {appliedCoupons && appliedCoupons.length > 0 && (
            <Box mt={2} mb={2}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={9}>
                  Total Amount
                </Grid>

                <Grid item xs={3}>
                  <Box display="flex" justifyContent="center">
                    ${props.amount}
                  </Box>
                </Grid>
              </Grid>

              {appliedCoupons.map((coupon, index) => {
                return (
                  <Grid
                    style={{ marginTop: 5 }}
                    key={index}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={9}>
                      {`Discount applied(${coupon.promoCode})`}
                      <CloseIcon
                        onClick={() => {
                          handleCloseCoupon(index);
                        }}
                        style={{
                          marginLeft: 2,
                          cursor: "pointer",
                          fontSize: "15px",
                          color: "#EC5269",
                        }}
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <Box display="flex" justifyContent="center">
                        - $
                        {coupon.type === "percentage"
                          ? calculatePercentageAmount(
                              props.amount,
                              coupon.value
                            ).toFixed(2)
                          : coupon.value}
                      </Box>
                    </Grid>
                  </Grid>
                );
              })}

              <Box mt={1}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={9}>
                    To Pay
                  </Grid>

                  <Grid item xs={3}>
                    <Box display="flex" justifyContent="center">
                      ${pay}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </>
      )}
      <TextField
        label="First Name"
        name="firstName"
        required
        fullWidth
        style={{ marginTop: 15, marginBottom: 15 }}
        InputLabelProps={{ shrink: true }}
        value={billingDetails.firstName}
        error={displayBillingDetailsErr && !billingDetails.firstName}
        onChange={(e) => {
          setBillingDetails({ ...billingDetails, firstName: e.target.value });
        }}
      />
      <TextField
        label="Last Name"
        name="lastName"
        required
        fullWidth
        style={{ marginTop: 15, marginBottom: 15 }}
        InputLabelProps={{ shrink: true }}
        value={billingDetails.lastName}
        error={displayBillingDetailsErr && !billingDetails.lastName}
        onChange={(e) => {
          setBillingDetails({ ...billingDetails, lastName: e.target.value });
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
      <Typography style={{ color: "#00000099", fontSize: 13, marginTop: 15 }}>
        Card Number / Expiry / CVV *
      </Typography>
      <CreditCardInput
        ref={cardInputref}
        onValidityStatusChange={(status) => {
          setIsValidCard(status);
        }}
        cardNumberInputProps={{
          value: cardNumber,
          onChange: (e) => setCardNumber(e.target.value),
        }}
        cardExpiryInputProps={{
          value: expiry,
          onChange: (e) => setExpiry(e.target.value),
        }}
        cardCVCInputProps={{
          value: cvc,
          onChange: (e) => setCvc(e.target.value),
        }}
        containerStyle={{
          width: "100%",
          padding: "6px 0 7px",
          marginBottom: 15,
        }}
        fieldStyle={{
          width: "100%",
          border: 0,
          outline: 0,
          borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
          borderRadius: 0,
        }}
        invalidStyle={{
          width: "100%",
          border: 0,
          outline: 0,
          borderBottom: "2px solid red",
        }}
        inputStyle={{ paddingTop: 10 }}
        fieldClassName="input"
      />

      <div style={{ marginBottom: 10 }}>
        <ReCAPTCHA
          ref={captchaRef}
          // size="invisible"
          sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
          onErrored={() => {
            console.log("on onErrored");
            setCaptchaString("");
          }}
          onExpired={() => {
            console.log("on expired");
            setCaptchaString("");
          }}
          onChange={(captcha) => {
            setCaptchaString(captcha);
            console.log("on change", captcha);
          }}
        />
      </div>
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
  setToPay: PropTypes.function,
  appliedCoupons: PropTypes.array,
  setPayLoading: PropTypes.function,
};

CheckoutForm.defaultProps = {
  amount: 0,
  type: "",
  checkoutData: {},
  showCouponCode: false,
  onSuccess: () => {},
  onFailure: () => {},
  setToPay: () => {},
  appliedCoupons: [],
  setPayLoading: () => {},
};
