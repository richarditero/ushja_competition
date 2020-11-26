import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ApiRouter from '../../../constants';
import * as authActionCreator from '../../../store/action/authAction';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7',
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.auth);
  const [displayName, setDisplayName] = useState('');

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

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {displayName}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${userDetails?.city} ${userDetails?.country}`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')} ${user.timezone}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
