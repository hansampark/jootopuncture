import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  TextField,
  FormGroup,
  Typography,
  Button,
  CircularProgress
} from '@material-ui/core';
import api from '../../lib/api';
import { lowerCase } from '../../lib/strings';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../lib/validators';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'auto',
    minHeight: 'min-content'
  },
  container: {
    padding: theme.spacing(3, 2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '0 auto'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    // Using media query for responsiveness
    // Breakpoint definistions
    // xs => 0-600px, sm => 600px-960px, md => 960px-1280px, lg => 1280px-1920px
    [theme.breakpoints.down('xs')]: {
      width: 250
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: 300
    },
    [theme.breakpoints.up('md')]: {
      width: 350
    },
    [theme.breakpoints.up('lg')]: {
      width: 400
    }
  },
  button: {
    margin: theme.spacing(10),
    width: 200
  },
  progress: {
    color: '#ffffff'
  }
}));

const validate = ({ email, password, confirm }) => {
  const errors = {};

  if (email) {
    if (!EMAIL_REGEX.test(email)) {
      errors.email =
        'Email address must be in a valid format (e.g. name@example.com).';
    }
  } else {
    errors.email = 'Email is required.';
  }

  if (password) {
    if (!PASSWORD_REGEX.test(password)) {
      errors.password =
        'Password must be 8-20 characters and contain one uppercase letter, one lowercase letter, one number, and one special character (` ~ ! @ # $ % ^ & * ( ) _ - + = { } [ ]  | : ; " \' < > , . ? /).';
    }
  } else {
    errors.password = 'Password is required.';
  }

  if (confirm) {
    if (confirm !== password) {
      errors.confirm =
        'New password do not match. Please re-enter fields above.';
    }
  }

  return errors.email || errors.password || errors.confirm ? errors : null;
};

// TODO: redesign LoginPage

function LoginPage(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirm: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleValueChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    setErrors(null);
  };

  return (
    <Grid item>
      <div className={classes.root}>
        <Paper className={classes.container}>
          <div>
            <Typography
              color="primary"
              align="center"
              variant="h3"
              component="h3"
              style={{ marginBottom: 10 }}
            >
              {'Jootopuncture'}
            </Typography>
            <Typography align="center" variant="h4" component="h3">
              {'Reset Password'}
            </Typography>
          </div>

          <form className={classes.form}>
            <FormGroup>
              <TextField
                id="email"
                label="Email"
                className={classes.textField}
                value={values.email}
                error={errors && (!!errors.email || !!errors.message)}
                helperText={errors && errors.email}
                onChange={handleValueChange('email')}
                autoFocus
                margin="normal"
              />
            </FormGroup>

            <FormGroup>
              <TextField
                id="password"
                label="Password"
                type="password"
                className={classes.textField}
                value={values.password}
                error={errors && (!!errors.password || !!errors.message)}
                helperText={errors && errors.password}
                onChange={handleValueChange('password')}
                margin="normal"
              />
            </FormGroup>

            <FormGroup>
              <TextField
                id="confirm"
                label="ConfirmPassword"
                type="password"
                className={classes.textField}
                value={values.confirm}
                error={errors && (!!errors.confirm || !!errors.message)}
                helperText={errors && errors.confirm}
                onChange={handleValueChange('confirm')}
                margin="normal"
              />
            </FormGroup>

            {errors && errors.message && (
              <Typography color="secondary" align="center" component="div">
                {errors.message}
              </Typography>
            )}

            <Button
              variant="contained"
              type="submit"
              color="primary"
              className={classes.button}
              onClick={e => handleResetPassword(e, values)}
            >
              {loading ? (
                <CircularProgress
                  style={{ width: 24, height: 24 }}
                  className={classes.progress}
                />
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>
        </Paper>
      </div>
    </Grid>
  );

  async function handleResetPassword(e, values) {
    e.preventDefault();
    const { email, password, confirm } = values;

    const validationErrors = validate({
      email,
      password,
      confirm
    });

    if (validationErrors) {
      setLoading(false);
      setErrors(validationErrors);
    } else {
      setLoading(true);
      setErrors(null);

      try {
        await api.put('/reset', { email: lowerCase(email), password });

        setLoading(false);
        props.history.push('/login');
      } catch (err) {
        setErrors(err);
        setLoading(false);
      }
    }
  }
}

export default LoginPage;
