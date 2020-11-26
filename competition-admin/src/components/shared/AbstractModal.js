import React from 'react';
import {
  Modal, Backdrop, Grid, Box, Typography, IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

const Fade = React.forwardRef((props, ref) => {
  const {
    in: open, children, onEnter, onExited, ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  fade: ({ modalStyle, modalSmStyle }) => ({
    height: '80%',
    width: '50%',
    outline: 0,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
      ...modalSmStyle,
    },
    ...modalStyle,
  }),
  container: ({ containerStyle }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    height: '100%',
    width: '100%',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
    ...containerStyle,
  }),
  title: {
    fontSize: 18,
    fontWeight: 500,
    fontFamily: 'IBM Plex Sans',
  },
  titleContainer: {
    padding: theme.spacing(1, 3, 1),
    borderBottom: '1px solid #dfdfdf',
  },
}));

function AbstractModal({
  open, toggle, title, modalStyle, containerStyle, children, modalSmStyle,
}) {
  const classes = useStyles({ modalStyle, containerStyle, modalSmStyle });

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={toggle}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open} className={classes.fade}>
        <div className={classes.container}>

          { title && (
          <div className={classes.titleContainer}>
            <Grid container>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box style={{ flex: 1 }}>
                    <Typography className={classes.title}>
                      {title}
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <IconButton onClick={toggle}>
                      <CloseIcon size="1.5rem" />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </div>
          )}
          {children}
        </div>
      </Fade>

    </Modal>
  );
}

AbstractModal.defaultProps = {
  children: <div />,
  modalStyle: {},
  modalSmStyle: {},
  containerStyle: {},
  title: '',
  open: false,
  toggle: () => {},
};

AbstractModal.propTypes = {
  children: PropTypes.element,
  modalStyle: PropTypes.object,
  modalSmStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  title: PropTypes.string,
  open: PropTypes.bool,
  toggle: PropTypes.func,
};

export default AbstractModal;
