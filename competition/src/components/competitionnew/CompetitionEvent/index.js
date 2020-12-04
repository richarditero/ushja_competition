import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import strings from '../../../i18n/Strings';
import {ApiUtil} from '../../../util/ApiUtil';
import {showFailureSnackbar} from '../../../store/action/snackbarAction';
import {
  Grid,
  Paper,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Divider,
  Button,
  CircularProgress,
  Box
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import './CompetitionForm.css';
import Footer from "../../layout/footer";

const useStyles = makeStyles({
  gridDataText: {
    color: '#7c7c7c',
    fontWeight: 600,
    margin: 1
  },
  gridHeadDataText: {
    fontWeight: 600,
    margin: 1
  },
  buttonStyle: {
    background: '#EC5269',
    color: 'white',
    textTransform: 'none',
    borderRadius: 10,
    width: 160,
    margin: '1%'
  },
  headerText: {
    color: '#7c7c7c',
    fontWeight: '600'
  }
});

function CompetitionEvents(props) {
  const classes = useStyles();
  const [competitionEvents, setCompetitionEvents] = useState([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    competitionName: '',
    competitionId: '',
    competitionLocation: '',
    competitionDate: '',
    uploaded_document: '',
    uploaded_document_name: '',
    uploaded_document_mimeType: ''
  });
  const [inputValue, setInputValue] = useState('MM-DD-YY');

  const [uploadedDocument, setUploadedDocument] = useState({
    fileName: '',
    data: '',
    mimeType: ''
  });
  const [loader, setLoader] = useState(false);
  const hiddenFileInput = React.useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoader(true);
    const competitionId =
      props.location.state.selectedCompetition.competitionId;

    if (competitionId) {
      ApiUtil.getWithOutToken(`competition/events/${competitionId}`)
        .then(result => {
          const events = result.data.map(value => ({
            ...value,
            isChecked: false,
            quantity: 0
          }));
          setCompetitionEvents(events);
          setLoader(false);
        })
        .catch(err => {
          console.log(err);
          setLoader(false);
        });
    }
  }, []);

  const onCheckboxChange = competitionEvent => {
    setCompetitionEvents(state =>
      state.map(value => {
        if (competitionEvent.competitionEventId === value.competitionEventId) {
          return {
            ...value,
            isChecked: !value.isChecked,
            quantity: value.quantity > 0 ? value.quantity : 1
          };
        }
        return value;
      })
    );
  };

  const handleQunatityInputChange = (competitionEvent, inputValue) => {
    inputValue = parseFloat(inputValue);
    setCompetitionEvents(state =>
      state.map(value => {
        if (competitionEvent.competitionEventId === value.competitionEventId) {
          return {...value, quantity: inputValue >= 0 ? inputValue : 0};
        }
        return value;
      })
    );
  };

  const handleFormInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setFormData(state => ({
      ...state,
      [name]: value
    }));
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    let selectedFile = event.target.files;
    let file = null;
    let fileName = '';
    //Check File is not Empty
    if (selectedFile.length > 0) {
      // Select the very first file from list
      let fileToLoad = selectedFile[0];
      fileName = fileToLoad.name;
      let type = fileToLoad.name.split('.')[
        fileToLoad.name.split('.').length - 1
      ];
      const extensions = ['pdf', 'doc', 'docx', 'pdf', 'xls', 'xlsx', '.txt'];

      //Check select file
      if (type && extensions.includes(type)) {
        let fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
          file = fileLoadedEvent.target.result;
          let base64_data = file.split(',')[1];
          let pdfFile = {
            fileName: fileName,
            data: base64_data,
            mimeType: fileToLoad.type
          };
          setUploadedDocument(pdfFile);
        };
        // Convert data to base64
        fileReader.readAsDataURL(fileToLoad);
      } else {
        return dispatch(
          showFailureSnackbar(strings.displayText.uploadedFileIsnotInPdfFormat)
        );
      }
    }
  };

  useEffect(() => {
    const findTotal = () => {
      const totalPrice = competitionEvents.reduce(
        (accumulator, {quantity, price, isChecked}) =>
          isChecked ? accumulator + quantity * price : accumulator,
        0
      );
      setTotal(totalPrice);
    };

    findTotal();
  }, [competitionEvents]);

  const onSubmit = () => {
    console.log(formData);

    const summary = competitionEvents
      .map(({competitionEventId, quantity, isChecked}) => {
        if (quantity > 0 && isChecked) return {competitionEventId, quantity};
      })
      .filter(val => {
        if (val) {
          return val;
        }
      });

    if (summary.length < 1) {
      return dispatch(
        showFailureSnackbar(strings.displayText.selectAtLeaseOneCompetition)
      );
    }

    if (!formData.competitionName) {
      return dispatch(
        showFailureSnackbar(strings.displayText.enterTheCompetitionName)
      );
    } else if (!formData.competitionId) {
      return dispatch(
        showFailureSnackbar(strings.displayText.enterTheCompetitionId)
      );
    } else if (!formData.competitionDate) {
      return dispatch(
        showFailureSnackbar(strings.displayText.enterTheCompetitionDate)
      );
    }

    let checkoutData = {};
    checkoutData.items = summary;
    checkoutData.form = props.location.state.selectedCompetition;
    checkoutData.formData = formData;
    checkoutData.formData.uploaded_document = uploadedDocument.data;
    checkoutData.formData.uploaded_document_name = uploadedDocument.fileName;
    checkoutData.formData.uploaded_document_mimeType =
      uploadedDocument.mimeType;

    props.history.push({
      pathname: '/checkout',
      state: {
        checkoutData: checkoutData,
        amount: total,
        type: 'openCompetition',
        username: props.location.state.username,
        email: props.location.state.email
      }
    });
  };

  const handleGoBack = () => {
    props.history.goBack();
  };

  return (
    <Box mt={2}>
      <Grid container>
        {loader && <CircularProgress className="spinner-style" />}
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography className={classes.headerText}>
              Please fill in your competition details.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Competition Name"
                name="competitionName"
                value={formData.competitionName}
                onChange={handleFormInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Competition ID"
                onChange={handleFormInputChange}
                value={formData.competitionId}
                name="competitionId"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Competition Location"
                onChange={handleFormInputChange}
                value={formData.competitionLocation}
                name="competitionLocation"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  animateYearScrolling
                  style={{margin: 0}}
                  margin="normal"
                  id="date-picker-dialog"
                  label="Competition Date (MM/DD/YYY)"
                  format="MM-dd-yyyy"
                  value={formData.competitionDate}
                  helperText={''}
                  fullWidth
                  required
                  error={false}
                  onChange={val => {
                    console.log(val);
                    setFormData(state => ({
                      ...state,
                      competitionDate: val
                    }));
                    // setInputValue(val);
                  }}
                  InputLabelProps={{
                    shrink: formData.competitionDate ? true : false
                  }}
                />
              </MuiPickersUtilsProvider>
              {/*           <TextField
                label="Competition Date"
                fullWidth
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={handleFormInputChange}
                value={formData.competitionDate}
                name="competitionDate"
                required
              /> */}
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.headerText}>
                I wish pay the following USHJA competitions fees:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} square>
                {competitionEvents.map(competitionEvent => {
                  return (
                    <>
                      <Grid
                        container
                        style={{paddingLeft: 10, paddingRight: 10}}>
                        <Grid item xs={10}>
                          <Grid container>
                            <Grid item xs={12}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    color="primary"
                                    checked={competitionEvent.isChecked}
                                    onChange={() => {
                                      onCheckboxChange(competitionEvent);
                                    }}
                                    style={{
                                      color: '#0073e4'
                                    }}
                                  />
                                }
                                label={
                                  <Typography className={classes.headerText}>
                                    {competitionEvent.name}
                                  </Typography>
                                }
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Typography style={{paddingLeft: 30}}>
                                {competitionEvent.description}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControlLabel
                                style={{paddingLeft: 30}}
                                control={
                                  <Checkbox
                                    color="primary"
                                    style={{
                                      color: '#0073e4'
                                    }}
                                  />
                                }
                                label={
                                  <Typography className={classes.headerText}>
                                    Offered, Did not fill
                                  </Typography>
                                }
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          xs={1}
                          justify="center"
                          alignItems="flex-end">
                          <TextField
                            type="number"
                            disabled={!competitionEvent.isChecked}
                            value={
                              competitionEvent.isChecked &&
                              competitionEvent.quantity
                            }
                            onChange={e => {
                              handleQunatityInputChange(
                                competitionEvent,
                                e.target.value
                              );
                            }}
                          />
                        </Grid>
                        <Grid item xs={1} style={{textAlign: 'center'}}>
                          <Typography>
                            {competitionEvent.isChecked &&
                              '$' +
                                parseFloat(
                                  competitionEvent.quantity
                                    ? competitionEvent.quantity
                                    : 0
                                ) *
                                  parseFloat(competitionEvent.price)}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider style={{marginLeft: 30, marginRight: 30}} />
                    </>
                  );
                })}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.headerText}>
                Total: ${total}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <div>
                <div className="pdfName-container">
                  <p className={classes.headerText}>
                  Upload Results and/or Declarations :{' '}
                  </p>
                  <p className="pdf-name">{uploadedDocument.fileName}</p>
                </div>
                <div className="select-container" onClick={handleClick}>
                  Select Your File Here
                </div>

                <input
                  type="file"
                  ref={hiddenFileInput}
                  name="Pdf_Upload"
                  onChange={handleChange}
                  className="upload-file"
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.buttonStyle}
                onClick={e => handleGoBack()}>
                Go Back
              </Button>
              {/* <Button
                variant="contained"
                color="primary"
                className={classes.buttonStyle}
                onClick={onSubmit}>
                Add to cart
              </Button> */}
              <Button
                variant="contained"
                color="primary"
                className={classes.buttonStyle}
                onClick={onSubmit}>
                Pay
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1} />
      </Grid>
      <Box mt={2}>
        <Footer/>
      </Box>
    </Box>
  );
}

CompetitionEvents.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object
};

export default CompetitionEvents;
