import React from "react";
import { Typography, Box, Grid, Button } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import { makeStyles } from "@material-ui/core/styles";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles({
  nextbutton: {
    background: "#EC5269",
    color: "white",
    textTransform: "none",
    borderRadius: 10,
    width: "100%",
  },
});

function Thankyou(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div style={{ margin: "2%", textAlign: "center" }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box>
          <Typography variant="h4">
            {props?.location?.state?.type === "success"
              ? "Thanks for your payment"
              : "Your payment has been declined"}
          </Typography>
          <Box mt={2}>
            <Typography variant="h6">
              {props?.location?.state?.type === "success" ? (
                "Your payment has been received.  You will be receiving an email shortly with confirmation of your payment."
              ) : (
                <span>
                  Please verify your credit card details/billing information and
                  try again. If the error persists, please contact us at 
                  <a href="mailto:ushja@ushja.org">ushja@ushja.org</a>
                </span>
              )}
            </Typography>
          </Box>

          <Box style={{ textAlign: "center" }}>
            {props?.location?.state?.type === "success" ? (
              <ThumbUpAltIcon style={{ fontSize: "250px", color: "#b01e3f" }} />
            ) : (
              <SentimentVeryDissatisfiedIcon
                style={{ fontSize: "250px", color: "#b01e3f" }}
              />
            )}
          </Box>

          { props?.location?.state?.type === "success" && <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item sm={4} xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  history.replace({
                    pathname: '/competition',
                  });
                }}
                className={classes.nextbutton}
              >
                Submit Another Post Competition Report
              </Button>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Button
                href="https://www.ushja.org/"
                variant="contained"
                color="primary"
                className={classes.nextbutton}
              >
                Return to USHJA Home
              </Button>
            </Grid>
          </Grid>}
        </Box>
      </Box>
    </div>
  );
}

export default Thankyou;
