import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from '@material-ui/core';


import GridOnIcon from '@material-ui/icons/GridOn';
import NavItem from './NavItem';
import * as authActionCreator from '../../../store/action/authAction';
import ApiRouter from '../../../constants';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
};

const items = [
  {
    href: '/app/open-competition',
    icon: GridOnIcon,
    title: 'Competition',
  },
];

const useStyles = makeStyles((theme) => (
  {
    mobileDrawer: {
      width: 256,
      color: theme.palette.common.white,
    },
    desktopDrawer: {
      width: 256,
      top: 64,
      height: 'calc(100% - 64px)',
      // background: '#18202c',
      color: theme.palette.common.white,
    },
    avatar: {
      cursor: 'pointer',
      width: 64,
      height: 64,
    },
  }
));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.auth);
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const setUserDisplaydetails = () => {
    let fullName = '';
    fullName = userDetails?.firstName ? userDetails.firstName : fullName;
    fullName = userDetails?.lastName
      ? `${fullName} ${userDetails.lastName}`
      : fullName;

    setDisplayName(fullName);
  };

  useEffect(() => {
    if (_.isEmpty(userDetails)) {
      dispatch(
        authActionCreator.getUserDeatils(
          ApiRouter.ADMIN_USER,
        ),
      );
    } else {
      setUserDisplaydetails();
    }
  }, [userDetails]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {displayName}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Admin
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
