import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { clearSnackbar } from '../store/action/snackbarAction';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackBar() {
  const dispatch = useDispatch();

  const {
    successSnackbarMessage,
    snackbarOpen,
    failureSnackbarMessage,
    severity,
  } = useSelector((state) => state.snackbar);

  function handleClose() {
    dispatch(clearSnackbar());
  }

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Alert onClose={handleClose} severity={severity}>
          {severity === 'success'
            ? successSnackbarMessage
            : failureSnackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
