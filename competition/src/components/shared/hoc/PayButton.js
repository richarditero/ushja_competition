import React from 'react';
import {Button, CircularProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  nextStep: {
    background: '#EC5269',
    color: 'white',
    textTransform: 'none',
    borderRadius: 10,
    width: 160,
    margin: '1%'
  }
}));

export default function PayButton({amount, handlePayAmount, paymentLoader}) {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.nextStep}
      onClick={() => handlePayAmount()}>
      Pay - ${amount}
      {paymentLoader && (
        <CircularProgress
          style={{marginLeft: 10, color: 'white'}}
          size="1rem"
        />
      )}
    </Button>
  );
}
