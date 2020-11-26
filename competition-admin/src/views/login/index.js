import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import * as authActionCreator from '../../store/action/authAction';
import ApiRouter from '../../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  circularProgressSpace: {
    marginLeft: '10px',
  },
}));

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loader);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/app/dashboard', { replace: true });
    }
  }, [isLoggedIn]);

  return (

    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
    >
      <Container maxWidth="sm">
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().max(255).required('Username is required'),
            password: Yup.string().max(255).required('Password is required'),
          })}
          onSubmit={(values) => {
            if (!loading) {
              const loginData = {
                username: values.username,
                password: values.password,
              };
              dispatch(
                authActionCreator.loginUser(
                  ApiRouter.LOGIN,
                  loginData,
                ),
              );
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={3}>
                <Typography
                  color="textPrimary"
                  variant="h2"
                >
                  Sign in
                </Typography>

              </Box>

              <TextField
                error={Boolean(touched.username && errors.username)}
                fullWidth
                helperText={touched.username && errors.username}
                label="UserName"
                margin="normal"
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.username}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
              <Box my={2}>
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {loading ? <CircularProgress size={20} color="inherit" /> : ''}
                  {' '}
                  <span className={classes.circularProgressSpace}> Sign in now</span>
                </Button>
              </Box>
              <Typography
                color="textSecondary"
                variant="body1"
              >
                Don&apos;t have an account?
                {' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  variant="h6"
                >
                  Sign up
                </Link>
              </Typography>
            </form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default Login;
