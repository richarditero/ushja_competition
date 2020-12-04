import React, { useEffect } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ApiUtil from '../util/ApiUtil';
import * as authActionCreator from '../store/action/authAction';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = (status) => {
    setOpen(false);
    if (status === 'confirm') {
      dispatch(
        authActionCreator.logout(),
      );
      ApiUtil.nullifyToken();
      navigate('/login', { replace: true });
    }
  };

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props?.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('cancel')} color="primary">
            No
          </Button>
          <Button onClick={() => handleClose('confirm')} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
