import React from 'react';
import {Typography, Box} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

function Thankyou(props) {
  return (
    <div style={{margin: '2%', textAlign: 'center'}}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box>
          <Typography variant="h4">
            {props?.location?.state?.type === 'success'
              ? 'Thanks for your payment'
              : 'Transaction failed'}
          </Typography>
          <Box mt={2}>
            <Typography variant="h5">
              {props?.location?.state?.type === 'success'
                ? 'Your payment has been received.  You will be receiving an email shortly withconfirmation of your payment.'
                : 'Please contact admin'}
            </Typography>
          </Box>

          <Box style={{textAlign: 'center'}}>
            {props?.location?.state?.type === 'success' ? (
              <ThumbUpAltIcon style={{fontSize: '250px', color: '#b01e3f'}} />
            ) : (
              <SentimentVeryDissatisfiedIcon
                style={{fontSize: '250px', color: '#b01e3f'}}
              />
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Thankyou;
