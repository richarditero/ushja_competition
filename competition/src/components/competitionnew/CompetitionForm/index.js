import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@material-ui/core";
import _ from "lodash";
import strings from "../../../i18n/Strings";
import { ApiUtil } from "../../../util/ApiUtil";
import PropTypes from "prop-types";
import { regularExpression } from "../../../constants";
import Footer from "../../layout/footer";

const useStyles = makeStyles({
  gridDataText: {
    color: "#7c7c7c",
    fontWeight: 600,
    margin: 1,
  },
  gridHeadDataText: {
    fontWeight: 600,
    margin: 1,
  },

  nextbutton: {
    background: "#EC5269",
    color: "white",
    textTransform: "none",
    borderRadius: 10,
    width: "100%",
  },
  headerText: {
    color: "#7c7c7c",
    fontWeight: "600",
    marginLeft: 25,
  },
  formControl: {
    width: "100%",
  },
});

function CompetitionForm(props) {
  const [competition, setCompetition] = useState([]);
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState();

  useEffect(() => {
    setLoader(true);
    ApiUtil.getWithOutToken(`${strings.apiRouter.competition}`)
      .then((result) => {
        setCompetition(result.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }, []);

  const onSelectHandle = () => {
    if (username === "" || email === "" || !selectedCompetition) {
      setIsError(true);
    } else {
      if (!regularExpression.Email.test(String(email).toLowerCase())) {
        setEmailFormatError(true);
      } else {
        props.history.push({
          pathname: "/competition-event",
          state: {
            selectedCompetition,
            username,
            email,
          },
        });
      }
    }
  };

  const handleChange = (event) => {
    setSelectedCompetition(event.target.value);
  };

  return (
    <Box>
        <Grid container>
         {/*  {loader && <CircularProgress className="spinner-style" />} */}
          <Grid item xs={1} md={4} />
          <Grid item xs={10} md={4}>
            <Grid container style={{ margin: "5%" }}>
              <Paper elevation={3} style={{ padding: "2%", width: "100%" }}>
                <Grid container spacing={3} direction="row">
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      className={classes.gridDataText}
                    >
                      Please fill in your details below and choose the correct competition form.
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    spacing={3}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ padding: "5%" }}
                  >
                    <Grid item xs={12}>
                      <TextField
                        label="Name"
                        name="username"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                        fullWidth
                        required
                        error={isError && username.length === 0}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="E-mail"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        value={email}
                        name="email"
                        fullWidth
                        required
                        error={
                          (isError && email.length === 0) || emailFormatError
                        }
                        helperText={
                          emailFormatError && "Please enter valid email id"
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        className={classes.formControl}
                        required
                        error={isError && !selectedCompetition}
                      >
                        <InputLabel id="competition-select-label">
                          Select Competition Rating
                        </InputLabel>
                        <Select
                          labelId="competition-select-label"
                          id="competition-select"
                          value={selectedCompetition}
                          onChange={handleChange}
                        >
                          {competition.map((comp, index) => {
                            return (
                              <MenuItem
                                key={index + "_" + comp.name}
                                value={comp}
                              >
                                {_.replace(comp.name, "Form", "")}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onSelectHandle()}
                        className={classes.nextbutton}
                      >
                        Next
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={1} md={4} />
        </Grid>
        <div style={{ position:"absolute",bottom:0,width:'100%' }}>
          <Footer />
        </div>
    </Box>
  );
}
CompetitionForm.propTypes = {
  history: PropTypes.object,
};

export default CompetitionForm;
