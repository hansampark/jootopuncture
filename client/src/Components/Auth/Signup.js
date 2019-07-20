import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  TextField,
  FormGroup,
  Typography,
  Button,
  CircularProgress
} from '@material-ui/core';
import api from '../../lib/api';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '500px'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 350
  },
  button: {
    margin: theme.spacing(10)
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  progress: {
    margin: theme.spacing(2)
  }
}));

export default function Signup() {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleValueChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Typography align="center" variant="h4" component="h1">
          {'Sign up'}
        </Typography>

        <form className={classes.container}>
          <FormGroup>
            <TextField
              id="firstName"
              label="First Name"
              className={classes.textField}
              value={values.firstName}
              onChange={handleValueChange('firstName')}
              autoFocus
              margin="normal"
            />
          </FormGroup>

          <FormGroup>
            <TextField
              id="lastName"
              label="Last Name"
              className={classes.textField}
              value={values.lastName}
              onChange={handleValueChange('lastName')}
              margin="normal"
            />
          </FormGroup>
          <FormGroup>
            <TextField
              id="email"
              label="Email"
              className={classes.textField}
              value={values.email}
              onChange={handleValueChange('email')}
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
              onChange={handleValueChange('password')}
              margin="normal"
            />
          </FormGroup>

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={!!error}
            onClick={e => handleLogin(e, values)}
          >
            {loading ? (
              <CircularProgress className={classes.progress} />
            ) : (
              'Sign up'
            )}
          </Button>
        </form>
      </Paper>
    </div>
  );

  async function handleLogin(e, values) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post('/signup', values);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }
}