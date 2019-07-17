import React, { useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Paper,
  TextField,
  FormGroup,
  Typography,
  Button
} from '@material-ui/core';
import api from '../../lib/api';
import { EMAIL_REGEX } from '../../lib/validators';

const Center = styled.div`
  /*
   * Veritcally center content but if content is taller than viewport,
   * align it to top so content doesn't crop
   */
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  min-height: min-content;
`;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '0 auto'
  },
  container: {
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
  }
}));

const validate = ({ email, password }) => {
  const errors = {};

  if (email) {
    if (!EMAIL_REGEX.test(email)) {
      errors.email =
        'Email address must be in a valid format (e.g. name@example.com).';
    }
  } else {
    errors.email = 'Email is required.';
  }

  if (password.length === 0) {
    errors.password = 'Password is required.';
  }

  return errors.email || errors.password ? errors : null;
};

// TODO: redesign LoginPage

function LoginPage(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState(null);

  const handleValueChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Container>
      <Center>
        <Paper className={classes.root}>
          <Typography align="center" variant="h4" component="h1">
            Login
          </Typography>

          <form className={classes.container}>
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

            {errors && errors.message && (
              <Typography
                color="secondary"
                align="center"
                variant="div"
                component="div"
              >
                {errors.message}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={e => handleLogin(e, values)}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Center>
    </Container>
  );

  async function handleLogin(e, values) {
    e.preventDefault();

    const validationErrors = validate({
      email: values.email,
      password: values.password
    });

    if (validationErrors) {
      setLoading(false);
      setError(validationErrors);
    } else {
      setLoading(true);
      setError(null);

      try {
        await api
          .login({ email: values.email, password: values.password })
          .then(() => {
            props.history.push('/');
          });
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
  }
}

export default LoginPage;
